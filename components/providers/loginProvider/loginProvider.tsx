"use client"
import { LoginModal } from "@/components/loginModal/loginModal";
import { useSession } from "next-auth/react";
import React, { createContext, Dispatch, useEffect, useState } from "react";


type LoginState = {
  state: boolean 
  pathname: string | null
}


type Login = {
    login: LoginState,
    setLogin: Dispatch<React.SetStateAction<LoginState>>
}

export const LoginContext = createContext<Login | null>(null);

export function LoginProvider({children} : {children: React.ReactNode}){
    const [login, setLogin] = useState<LoginState>({
        state: false, pathname: null
    });

    const { status } = useSession();

    useEffect(() => {
        if (status === "authenticated")
            setLogin({ state: false, pathname: null })
        
    }, [status])

    return (
        <>
            <LoginContext.Provider value={{login, setLogin}}>
                {login.state && status === "unauthenticated" && <LoginModal /> } {children}
            </LoginContext.Provider>
        </>
    )
}