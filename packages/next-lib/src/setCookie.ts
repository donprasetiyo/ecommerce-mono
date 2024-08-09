'use server'

import { cookies } from "next/headers";

export async function setCookieClientSide(name: string, value: string){
    'use server'
    cookies().set(name, value);
    return null
}