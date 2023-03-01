export interface UserLogin { //send login
  email: string;
  password: string;
  rememberMe?: boolean
}

export interface UserLoginResponse { //respuesta login
  id: number;             //no
  username: string;
  role: string;           //sky
  token: string;
  message: string;        //no
  firstLogin?: boolean;
  // name: string;
  // surnames: string;       //sky
  // status: string;         //sky
}

export interface newUser { //sky user
  codChargue: number;
  codSchedule: number;
  username: string;
  phone: string;
  name: string;
  surnames: string;
  role: string;
}

export interface User {
  id: number;
  username: string;
  role: string;
  createdAt?: Date;
  updateAt?: Date;
  name: string;
  surnames: string;
  status?: string;
  firstLogin?: boolean;
  photo?: string;
  phone?: string;
  codChargue?: string;
  codSchedule?: string;
  chargue?: string;
  schedule?: string;
}

export interface UserUpdate {
  codChargue: string;
  codSchedule: string;
  id: number;
  fatherLastName: string;
  motherLastName: string;
  status: string;
  role: Roles;
  name: string;
  username: string;
}

export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
}

export type Roles = 'admin' | 'employee';

export interface UserReport {
  id: number;
  username: string;
  chargue: string;
  schedule: string;
  role: Roles;
  createdAt: string;
  updateAt: string;
  nombre: string;
  fatherLastName: string;
  motherLastName: string;
  status: string;
}
