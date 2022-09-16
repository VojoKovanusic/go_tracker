/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 2.21.588 on 2022-09-14 22:04:29.

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
    username: string;
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

export class UserResponse {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
}

export interface Serializable {
}
