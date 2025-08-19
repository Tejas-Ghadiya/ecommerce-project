
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface User {
    name: string;
    email?: Nullable<string>;
}

export interface Admin {
    name: string;
    email?: Nullable<string>;
}

export interface IQuery {
    index(): string | Promise<string>;
    get_user(): User[] | Promise<User[]>;
    admin_list(): Admin[] | Promise<Admin[]>;
}

type Nullable<T> = T | null;
