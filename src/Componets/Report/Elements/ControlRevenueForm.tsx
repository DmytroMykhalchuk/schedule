'use client';
import { UIInputField } from "@/Componets/UI/UIInputField";
import { useEffect, useState } from "react";
import { MonthCalendar } from '@/Componets/Report/MonthCalendar';
import dayjs, { Dayjs } from "dayjs";

type ControlRevenueFormType = {
    dictionary: {
        total: string;
        note: string;
        date: string;
    };
    defaultValues?: {
        cost: number;
        note: string;
        date: Date;
    };
    locale: string;
    createdId?: string;
};

export const ControlRevenueForm: React.FC<ControlRevenueFormType> = ({ defaultValues, dictionary, locale, createdId }) => {
    const [formData, setFormData] = useState({
        cost: (defaultValues?.cost || '') as string | number,
        note: defaultValues?.note || '',
        date: defaultValues?.date || dayjs(),
    });

    useEffect(() => {
        createdId && setFormData({
            cost: (defaultValues?.cost || '') as string | number,
            note: defaultValues?.note || '',
            date: defaultValues?.date || dayjs(),
        })
    }, [createdId]);

    const onChangeDate = (date: Dayjs) => {
        setFormData({
            ...formData,
            date,
        });
    };

    const onChangeCost = (event: React.ChangeEvent<HTMLInputElement>) => {
        const cost = event.currentTarget.value;

        setFormData({
            ...formData,
            cost,
        });
    };

    const onChangeNote = (event: React.ChangeEvent<HTMLInputElement>) => {
        const note = event.currentTarget.value;

        setFormData({
            ...formData,
            note,
        });
    };

    return (
        <>
            <UIInputField
                label={dictionary.total}
                name="cost"
                inputAdorment={{ label: '$', position: 'start' }}
                value={formData.cost}
                onChange={onChangeCost}
                type="number"
            />
            <UIInputField
                label={dictionary.note}
                name="note"
                required={false}
                value={formData.note}
                onChange={onChangeNote}
            />
            <MonthCalendar
                value={defaultValues?.date}
                label={dictionary.date}
                locale={locale}
                onChange={onChangeDate}
            />
        </>
    );
};