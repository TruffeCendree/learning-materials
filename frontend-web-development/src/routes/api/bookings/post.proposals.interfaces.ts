import EmployeeInformation from "../../../models/employee-information";
import User from "../../../models/user";

export interface Bookings$ProposalsParams {
  latitude: number
  longitude: number
  startTime: number
  durationInHours: number
}

export interface Bookings$ProposalsResponse {
  proposals: {
    employee: User & { employeeInformation: EmployeeInformation },
    availability: { start: number, end: number }[]
  }[]
}
