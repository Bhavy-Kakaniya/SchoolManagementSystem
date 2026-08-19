"use client"

import { useState } from "react";
import { CreateSchoolAdminValues } from "@/types/school";
import InputFieldTag from "../InputField";
import { Button } from "@mui/material";

interface SchoolAdminFormProps {
    initialValues: CreateSchoolAdminValues;
    onSubmit: (values: CreateSchoolAdminValues) => void;
};

export default function SchoolForm({ initialValues, onSubmit }: SchoolAdminFormProps) {
    const [formValues, setFormValues] = useState<CreateSchoolAdminValues>(initialValues);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // set forms value for every field no need of multiple func
        const { name, value } = event.target;
        setFormValues((previous) => ({...previous, [name]: value}));  // ...previous prevents other field from disappearing
    };

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(formValues);
    };

    return (
        <form onSubmit={handleSubmit}>
            <InputFieldTag name="name" label="Admin Name" value={formValues.name} onChange={handleChange} required />
            <InputFieldTag name="email" label="Email" type="email" value={formValues.email} onChange={handleChange} required />
            <Button type='submit'>Create Admin</Button>
        </form>
    );
}