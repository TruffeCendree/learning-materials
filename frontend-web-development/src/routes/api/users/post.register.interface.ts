export type Users$RegisterParams = {
  email: string
  password: string
  firstname: string
  lastname: string
} & (
  { role: 'customer' } |
  {
    role: 'employee', 
    employeeInformation: {
      latitude: number
      longitude: number
    }
  }
)
