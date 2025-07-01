import React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { sysSizing } from '../../../ui/materialui/styles';
import { BorderColor } from '@mui/icons-material';

interface ISignInStyles {
	Container: React.ElementType;
	Content: React.ElementType;
	FormContainer: React.ElementType;
	FormWrapper: React.ElementType;
	TextContainer: React.ElementType;
}

const SignInStyles: ISignInStyles = {
	Container: styled(Box)(({ theme }) => ({
		minHeight: '100vh',
		width: '100%',
		backgroundColor: theme.palette.tertiary.main,
		color: theme.palette.tertiary.contrastText,
		position: 'relative',

		[theme.breakpoints.up('md')]: {
			backgroundImage: 'url(/images/backgroundToDo.png)',
			backgroundSize: 'cover',
			backgroundPosition: 'right'
		}
	})),
	Content: styled(Box)(({ theme }) => ({
		width: '100%',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		gap: theme.spacing(6),
		padding: `${sysSizing.spacingFixedLg} ${sysSizing.spacingFixedXl}`,

		[theme.breakpoints.up('md')]: {
			width: 'auto',
			height: 'auto',
			position: 'absolute',
			top: '50%',
			left: '20%',
			transform: 'translateY(-50%)'
		}
	})),
	FormContainer: styled(Paper)(({ theme }) => ({
		width: '100%',
		padding: `${sysSizing.spacingFixedLg} ${sysSizing.spacingFixedXl}`,
		borderRadius: sysSizing.radiusLg,
		boxShadow: theme.shadows[3],
		gap: sysSizing.spacingFixedXl,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
		maxWidth: '400px',
		backgroundColor: theme.palette.tertiary.light
	})),
	FormWrapper: styled(Box)(({ theme }) => ({
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		gap: theme.spacing(2)
	})),
	TextContainer: styled(Box)(({ theme }) => ({
		width: '100%',
		textAlign: 'center',
		color: theme.palette.tertiary.contrastText
	}))
};

export const sxButton = {
	color: (theme: any) => theme.palette.tertiary.contrastText,
	backgroundColor: (theme: any) => theme.palette.tertiary.main,
	borderColor: (theme: any) => theme.palette.tertiary.main,
	'&:hover': {
		backgroundColor: (theme: any) => theme.palette.tertiary.dark,
		borderColor: (theme: any) => theme.palette.tertiary.dark
	},
	'&.Mui-disabled': {
		backgroundColor: (theme: any) => theme.palette.tertiary.light,
		borderColor: (theme: any) => theme.palette.tertiary.light
	},
	'&:Mui-focused': {
		backgroundColor: (theme: any) => theme.palette.tertiary.main,
		borderColor: (theme: any) => theme.palette.tertiary.main
	}
};

export const sxTextField = {
	textField: {
		'& .MuiInputBase-root': { backgroundColor: (theme: any) => theme.palette.tertiary.light },
		'& .MuiFilledInput-root': {
			'&:hover': {
				backgroundColor: (theme: any) => theme.palette.tertiary.light
			},
			'&.Mui-focused': {
				backgroundColor: (theme: any) => theme.palette.tertiary.light
			},
			'&:hover.Mui-focused': {
				backgroundColor: (theme: any) => theme.palette.tertiary.light
			}
		}
	}
};

export default SignInStyles;
