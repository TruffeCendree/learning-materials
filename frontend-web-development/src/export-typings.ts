import * as fs from 'fs'

fs.mkdirSync('dist-typings/models')
fs.mkdirSync('dist-typings/routes')
fs.mkdirSync('dist-typings/routes/api')

const modelFiles = fs.readdirSync('build/typings/models')
  .filter(file => !['commit.d.ts', 'model-by-name.d.ts'].includes(file))
  .filter(file => file.endsWith('.d.ts'))

for (const modelFile of modelFiles) {
  const modelDef = fs.readFileSync(`build/typings/models/${modelFile}`, 'utf8')
    .split('\n')
    .filter(_ => !_.includes('Relation') && !_.includes('Policy') && !/^[ ]+[a-zA-Z-0-9]+\(/.test(_))
    .join('\n')
  let [, modelName, interfaceBody] = modelDef.match(/ ([a-zA-Z0-9]+)_base {([\s\S]*\n)}\n/m)
  interfaceBody = interfaceBody.replace(/jointure: {[\s\S]*};/m, '')

  fs.writeFileSync(`dist-typings/models/${modelFile}`, `export default interface ${modelName} {${interfaceBody}}`, 'utf8')
  console.log(`Emitted dist-typings/models/${modelFile}`)
}

for (const routesFolder of ['api/bookings', 'api/users', 'auth']) {
  const routeFiles = fs.readdirSync(`build/typings/routes/${routesFolder}`)
  fs.mkdirSync(`dist-typings/routes/${routesFolder}`)

  for (const routeFile of routeFiles) {
    if (routeFile.endsWith('.interfaces.d.ts')) {
      const routeParams = fs.readFileSync(`build/typings/routes/${routesFolder}/${routeFile}`, 'utf8')
      fs.writeFileSync(`dist-typings/routes/${routesFolder}/${routeFile}`, routeParams, 'utf8')
    }
  }
}
