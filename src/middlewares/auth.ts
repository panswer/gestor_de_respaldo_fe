import { redirect, type MiddlewareFunction } from "react-router";

export const validateSession: MiddlewareFunction<any> = (_args, next) => {
    const session = sessionStorage.getItem('token');

    if (session) {
        return next();
    }

    throw redirect('/');
}