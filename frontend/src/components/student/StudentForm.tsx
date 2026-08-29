"use client"

import InputFieldTag from "@/components/InputField";
import { CreateStudentValues } from "@/types/student";
import { Button, MenuItem, TextField } from "@mui/material";
import { useState } from "react";

interface CreateStudentFormProps {
    initialValues: CreateStudentValues;
    onSubmit: (values: CreateStudentValues) => void;
};

export default function CreateStudentForm({ initialValues, onSubmit }: CreateStudentFormProps) {
    const [formValues, setFormValues] = useState<CreateStudentValues>(initialValues);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(formValues);
    };

    return (
        <form onSubmit={handleSubmit}>
            <InputFieldTag name="firstName" label="First Name" value={formValues.firstName} onChange={handleChange} required />
            <InputFieldTag name="lastName" label="Last Name" value={formValues.lastName} onChange={handleChange} required />
            <InputFieldTag name="email" label="Email" value={formValues.email} type="email" onChange={handleChange} required />
            <InputFieldTag name="admissionNo" label="Admission Number" value={formValues.admissionNo} onChange={handleChange} required />
            <TextField select name="gender" label="Gender" value={formValues.gender} onChange={handleChange} required margin="normal" sx={{ width: "100%" }}>
                <MenuItem value="MALE">Male</MenuItem>
                <MenuItem value="FEMALE">Female</MenuItem>
                <MenuItem value="OTHER">Other</MenuItem>
            </TextField>
            <InputFieldTag name="dateOfBirth" label="Date Of Birth" type="date" value={formValues.dateOfBirth} onChange={handleChange} required />
            <InputFieldTag name="phone" label="Phone" value={formValues.phone} onChange={handleChange} />
            <InputFieldTag name="bloodGroup" label="Blood Group" value={formValues.bloodGroup} onChange={handleChange} />
            <InputFieldTag name="address" label="Address" value={formValues.address} onChange={handleChange} />
            <Button type="submit" variant="contained">Create Student</Button>
        </form>
    );
};