"use client"

import { InputAdornment, TextField } from '@mui/material';
import { stringify } from 'querystring';

interface InputFieldTagProps {
	label: string;
	color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
	margin?: 'none' | 'normal' | 'dense';
	width?: string | number;
	type?: 'password' | 'text' | 'number' | 'email' | 'date';
	value?: string | number;
	required?: boolean;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
	name?: string;
}

export default function InputFieldTag({
	name, label, value, onChange,
	margin = 'normal', color = 'primary', width = '100%', type = 'text',
	startIcon, endIcon, required,
}: InputFieldTagProps) {
	return (
		<TextField
			name={name} label={label} value={value} onChange={onChange}
			margin={margin} color={color} required={required} type={type}
			sx={{ width }}
			slotProps={{
				input: {
					startAdornment: startIcon ? (
						<InputAdornment position="start">{startIcon}</InputAdornment>
					) : undefined,
					endAdornment: endIcon ? (
						<InputAdornment position="end">{endIcon}</InputAdornment>
					) : undefined,
				}
			}}
		/>
	);
}