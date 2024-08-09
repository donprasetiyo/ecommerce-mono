import 'server-only'
import { RedirectType, redirect } from 'next/navigation';

const redirectToLoginIfUnauthorized = (pathname: string):void => {
   return redirect(`/login?next=${pathname}`, RedirectType.push);
}

const redirectToVerifyIfUnverified = (pathname: string):void => {
   return redirect(`/login/verify?next=${pathname}`, RedirectType.push);
}

export { redirectToLoginIfUnauthorized,redirectToVerifyIfUnverified };