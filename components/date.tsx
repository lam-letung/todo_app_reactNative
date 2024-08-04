import { SetStateAction, useCallback, useState } from 'react';
import { DatePickerModal } from 'react-native-paper-dates';
import { CalendarDate } from 'react-native-paper-dates/lib/typescript/Date/Calendar';
import { registerTranslation } from 'react-native-paper-dates'
import { enGB } from 'react-native-paper-dates';
import { format } from 'date-fns';

registerTranslation("en", enGB);
interface IProps {
    open: boolean
    setOpen: any
    date: CalendarDate
    setDate: any
    label?: string
}

function DateComponet(props: IProps) {


    const onDismissSingle = useCallback(() => {
        props.setOpen(false);
    }, [props.setOpen]);

    const onConfirmSingle = useCallback(
        (params: any) => {
            props.setOpen(false);
            const dateFormat = format(params.date, "dd/MM/yyyy");
            props.setDate(params.date);
        },
        [props.setOpen, props.setDate]
    );
    return (
        <DatePickerModal
            locale="en"
            mode="single"
            visible={props.open}
            onDismiss={onDismissSingle}
            date={props.date}
            onConfirm={onConfirmSingle}
            label={props.label}
            animationType='fade'
            
        />
    );
}

export default DateComponet;