/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 2.21.588 on 2022-09-04 07:27:43.

export class AuthenticationRequest {
    password: string;
    userName: string;
}

export class AuthenticationResponse implements Serializable {
    token: string;
    role: string;
}

export class Role {
    id: number;
    name: string;
}

export class Task implements Serializable {
    id: number;
    title: string;
    description: string;
    carType: string;
    price: number;
}

export class User implements Serializable {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    token: string;
    role: string;
    enabled: boolean;
    admin: boolean;
}

export interface Serializable {
}
