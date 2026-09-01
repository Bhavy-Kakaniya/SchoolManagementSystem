"use client";

import InputFieldTag from "@/components/InputField";
import {
    CreateStudentValues,
    Gender,
    UpdateStudentValues
} from "@/types/student";
import { Button, MenuItem, TextField } from "@mui/material";
import { useState } from "react";

interface CreateStudentFormProps {
    mode: "create";
    initialValues: CreateStudentValues;
    onSubmit: (values: CreateStudentValues) => void;
}

interface EditStudentFormProps {
    mode: "edit";
    initialValues: UpdateStudentValues;
    onSubmit: (values: UpdateStudentValues) => void;
}

type StudentFormProps = | CreateStudentFormProps | EditStudentFormProps;

type StudentFormState = {
    firstName: string;
    lastName: string;
    email: string;
    gender: Gender;
    dateOfBirth: string;
    phone: string;
    bloodGroup: string;
    address: string;
    admissionNo?: string;
};

export default function StudentForm(props: StudentFormProps) {
    const [formValues, setFormValues] = useState<StudentFormState>(props.initialValues);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (props.mode === "create") {
            props.onSubmit({
                ...formValues,
                admissionNo: formValues.admissionNo!
            });
        } else {
            props.onSubmit(formValues);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <InputFieldTag name="firstName" label="First Name" value={formValues.firstName} onChange={handleChange} required />
            <InputFieldTag name="lastName" label="Last Name" value={formValues.lastName} onChange={handleChange} required />
            <InputFieldTag name="email" label="Email" value={formValues.email} type="email" onChange={handleChange} required />
            {props.mode === "create" && (
                <InputFieldTag name="admissionNo" label="Admission Number" value={formValues.admissionNo ?? ""} onChange={handleChange} required />
            )}
            <TextField select name="gender" label="Gender" value={formValues.gender} onChange={handleChange} required margin="normal" sx={{ width: "100%" }}>
                <MenuItem value={Gender.MALE}>Male</MenuItem>
                <MenuItem value={Gender.FEMALE}>Female</MenuItem>
                <MenuItem value={Gender.OTHER}>Other</MenuItem>
            </TextField>

            <InputFieldTag name="dateOfBirth" label="Date Of Birth" type="date" value={formValues.dateOfBirth} onChange={handleChange} required />
            <InputFieldTag name="phone" label="Phone" value={formValues.phone} onChange={handleChange} />
            <InputFieldTag name="bloodGroup" label="Blood Group" value={formValues.bloodGroup} onChange={handleChange} />
            <InputFieldTag name="address" label="Address" value={formValues.address} onChange={handleChange} />
            <Button type="submit" variant="contained">{props.mode === "create" ? "Create Student" : "Update Student"}</Button>
        </form>
    );
}