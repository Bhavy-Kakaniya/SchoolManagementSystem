"use client"

import { InputAdornment, TextField } from '@mui/material';

interface InputFieldTagProps {
	label: String;
	color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
	margin?: 'none' | 'normal' | 'dense';
	width?: string | number;
	type?: 'password' | 'text' | 'number' | 'email';
	value?: String | number;
	required?: true | false
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
}

export default function InputFieldTag({
	label,
	margin = 'normal',
	color = 'primary',
	width = '100%',
	type = 'text',
	value,
	onChange,
	startIcon,
	endIcon,
	required,
}: InputFieldTagProps) {
	return (
		<TextField
			required={required}
			label={label}
			margin={margin}
			color={color}
			type={type}
			value={value}
			onChange={onChange}
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