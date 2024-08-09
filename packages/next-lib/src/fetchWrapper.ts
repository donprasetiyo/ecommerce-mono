import { toast } from "sonner";
import { checkForError } from "../../lib/src/error/frontend-global-error-handler";
import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { redirectToClientSide } from "./redirectToNext";

export function usePost<Body, Response>(url: string, successMessage?: string, disableErrorToast?: boolean, reloadOnSuccess?: boolean) {
    const [actionDialgoOpen, setActionDialogOpen] = useState(false);

    const pathname = usePathname();
    const mutation = useMutation({
        mutationFn: (cancelData: Body) => {
            return axios.post<Response>(url, cancelData)
        }
    })

    useEffect(() => {
        if (mutation.isError) {
            const error = mutation.error as AxiosError;
            if (error.response) {
                const errorJsonIfExist = checkForError(error.response.data);
                if (errorJsonIfExist) {
                    if (disableErrorToast === undefined || disableErrorToast === false) {
                        toast.error(errorJsonIfExist.error);
                    }
                }
            }
        }
    }, [disableErrorToast, mutation.error, mutation.isError])

    useEffect(() => {
        if (mutation.isSuccess && successMessage) {
            toast.success(successMessage);
            setActionDialogOpen(false);
            if (reloadOnSuccess === true) {
                redirectToClientSide(pathname)
            }
        }
    }, [mutation.isSuccess, pathname, reloadOnSuccess, successMessage])

    return { ...mutation, actionDialgoOpen, setActionDialogOpen }
}