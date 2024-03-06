'use client';
import { ProjectUsers } from '@/server/actions/types';
import { UserSelect } from './UserSelect';
import { UIInputField } from '@/Componets/UI/UIInputField';
import { useEffect, useState } from 'react';

type FormDataType = {
    targetUserId: string;
    role: string;
}

type ControlMemberFormType = {
    userId?: string;
    isDisabledSelect?: boolean;
    users: ProjectUsers[];
    role?: string;
    dictionary: {
        roleLabel: string;
    };
};

export const ControlMemberForm: React.FC<ControlMemberFormType> = ({ userId, role, isDisabledSelect, users, dictionary }) => {
    const [formData, setFormData] = useState({
        targetUserId: userId || '',
        role: role || '',
    });

    useEffect(() => {
        setFormData({
            targetUserId: userId || '',
            role: role || '',
        });
    }, [users]);

    const onChangeUserSelect = (userId: string) => {
        setFormData((formData: FormDataType) => ({ ...formData, targetUserId: userId }));
    };

    const onChangeRole = (event: React.ChangeEvent<HTMLInputElement>) => {
        const role = event.currentTarget.value;
        setFormData((formData: FormDataType) => ({ ...formData, role }));
    };


    return (
        <>
            <UserSelect
                fieldName="user"
                showEmail
                defaultUserId={formData.targetUserId}
                isDisabled={isDisabledSelect}
                users={users}
                onChange={onChangeUserSelect}
            />
            <UIInputField
                label={dictionary.roleLabel}
                name="role"
                defaultValue={role}
                required
                inputProps={{ maxLength: 30 }}
                onChange={onChangeRole}
                value={formData.role}
            />
        </>
    );
};