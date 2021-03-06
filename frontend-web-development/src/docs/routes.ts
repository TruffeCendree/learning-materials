import PrintableError from "../printable-error"
import * as get from 'lodash.get'

interface Route {
  funcRoute: Function
  path: string
  method: 'GET' | 'PATCH' | 'POST' | 'DELETE'
  description: string
  apiGroup: string
  apiName: string
  params: { key: string, type: 'string' | 'number' | 'object', required: boolean, description: string }[]
}

export const routes: Route[] = []

export function getApiDoc () {
  const comments = []

  for (const route of routes) {
    comments.push('/**')
    comments.push(`@api {${route.method.toLowerCase()}} ${route.path} ${route.apiName}`)
    comments.push(`@apiGroup ${route.apiGroup}`)
    
    for (const param of route.params) {
      const formattedkey = param.required ? param.key : `[${param.key}]`
      comments.push(`@apiParam {${param.type[0].toUpperCase()}${param.type.substring(1)}} ${formattedkey} ${param.description}`)
    }

    if (route.description) comments.push(`@apiDescription ${route.description}`)
    comments.push('*/\n')
  }

  return comments
}

export function route (funcRoute: Function, method: Route['method'], path: string, apiGroup: string, apiName: string, description = '') {
  routes.push({ funcRoute, method, path, description, apiGroup, apiName, params: [] })
}

export function params (funcRoute: Function, { key, type, required, desc }: { key: string, type: Route['params'][0]['type'], required: boolean, desc?: string }) {
  const route = routes.find(_ => _.funcRoute === funcRoute)
  route.params.push({ key, type, required, description: desc || '' })
  route.params.sort((a, b) => a.key.localeCompare(b.key))
}

export function sanetizeBody (funcRoute: Function, body: any, prefix = '') {
  const route = routes.find(_ => _.funcRoute === funcRoute)
  const safeBody: any = {}

  for (const key in body) {
    const absoluteKey = prefix ? prefix + '.' + key : key
    const param = route.params.find(_ => _.key === absoluteKey)

    if (param?.type === 'object') {
      safeBody[key] = sanetizeBody(funcRoute, body[key], absoluteKey)
    } else if (param?.type === typeof body[key]) {
      if (param.required && body[key] !== 0 && !body[key]) throw new PrintableError([`Missing value for parameter: ${absoluteKey}.`])
      safeBody[key] = body[key]
    } else if (param) {
      throw new PrintableError([`A ${param.type} is expected for ${absoluteKey}, but ${typeof body[key]} was supplied.`])
    } else {
      throw new PrintableError([`Unknown key found: ${absoluteKey}.`])
    }
  }

  if (prefix === '') {
    const excludedPaths: string[] = []

    for (const param of route.params) {
      if (typeof get(body, param.key) === 'undefined' && !excludedPaths.find(_ => param.key.startsWith(_))) {
        if (param.required) throw new PrintableError([`Missing parameter: ${param.key}.`])
        else excludedPaths.push(param.key)
      }
    }
  }
  
  return safeBody
}
