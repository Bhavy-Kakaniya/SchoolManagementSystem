import { SchoolFormValues } from "@/types/school";
import { useState } from "react";
import InputFieldTag from "../InputField";
import { Button } from "@mui/material";

interface SchoolFormProps {
    initialValues: SchoolFormValues;
    onSubmit: (values: SchoolFormValues) => void;
};

export default function SchoolForm({ initialValues, onSubmit }: SchoolFormProps) {
    const [formValues, setFormValues] = useState<SchoolFormValues>(initialValues);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // set forms value for every field no need of multiple func
        const { name, value } = event.target;
        setFormValues((previous) => ({
            ...previous, [name]: value // ...previous prevents other field from disappearing
        }));
    };

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(formValues);
    };

    return (
        <form onSubmit={handleSubmit}>
            <InputFieldTag name="name" label="School Name" value={formValues.name} onChange={handleChange} required />
            <InputFieldTag name="slug" label="Slug" value={formValues.slug} onChange={handleChange} required />
            <InputFieldTag name="logo" label="Logo" value={formValues.logo} onChange={handleChange} />
            <Button type='submit' variant='contained'>Save Changes</Button>
        </form>
    );
}