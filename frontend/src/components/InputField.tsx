import { InputAdornment, TextField } from '@mui/material';
// import TextField from '@mui/material/TextField';

interface InputFieldTagProps {
	label: string;
	color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
	margin?: 'none' | 'normal' | 'dense';
	width?: string | number;
	type?: 'password' | 'text' | 'number',
	startIcon?: React.ReactNode,
	endIcon?: React.ReactNode
}

export default function InputFieldTag({
	label,
	margin = 'normal',
	color = 'primary',
	width = '100%',
	type = 'text',
	startIcon,
	endIcon
}: InputFieldTagProps) {
	return (
		<TextField
			label={label}
			margin={margin}
			color={color}
			type={type}
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