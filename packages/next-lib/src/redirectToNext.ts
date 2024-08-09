'use server'

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function redirectToNextUrl() {
    const next = cookies().get('next')?.value || '/';

    return redirect(next);
}

export async function redirectToClientSide(path: string) {
    return redirect(path);
}