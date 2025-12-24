"use server"

import { auth } from "../auth";

export const verifyLogin = async() => {
    const session = await auth();
    return (session?.user) ? true : false;
}