import { environment } from "../../../environment/environment.delvelopment";

const API_BASE_URL=environment.baseUrl
 
export const ApiEndpoints = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/Auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    REFRESH_TOKEN: `${API_BASE_URL}/auth/refresh-token`,
  },
  APPOINTMENT : 
  {
    GET:`${API_BASE_URL}/AppointmentAPI/Get`,
    POST:`${API_BASE_URL}/AppointmentAPI/POST`
  }
 
};