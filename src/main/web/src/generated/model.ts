/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 2.21.588 on 2021-08-18 18:02:55.

export interface AuthenticationRequest {
    password: string;
    userName: string;
}

export interface AuthenticationResponse extends Serializable {
    token: string;
    role: string;
}

export interface Product extends Serializable {
    id: number;
    title: string;
    description: string;
    carType: string;
}

export interface Role {
    id: number;
    name: string;
}

export interface User extends Serializable {
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
