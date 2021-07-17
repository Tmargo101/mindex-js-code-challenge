import { Employee } from "./employee";

export enum Operations {
  Edit,
  Delete,
}

export class ModifyOperation {
  emp: Employee;
  op: Operations;
}