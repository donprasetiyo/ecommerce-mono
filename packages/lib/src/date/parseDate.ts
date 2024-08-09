import { format, parseISO } from 'date-fns';

export const parseDate = (date: string | object, withTime?: boolean) => {

    let dateToParse = date;

    if (typeof date === 'object') {
        const newdate = new Date(date.toString())
        dateToParse = newdate.toISOString();
    }

    const inputDate = dateToParse;
    const parsedDate = parseISO(inputDate as string);

    if (withTime){
        return format(parsedDate, 'MMMM dd, yyyy, HH:mm');
    }

    return format(parsedDate, 'MMMM, dd, yyyy');
}