import { Patient } from "./patient";
import { Donor } from "./donor";

export interface User {
  key?: string;
  email: string;
  password: string;
  displayName?: string;
  patientList?: Patient[];
  donorList?: Donor[];
}
