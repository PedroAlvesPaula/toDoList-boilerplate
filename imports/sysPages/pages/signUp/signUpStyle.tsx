/*!

 =========================================================
 * Material Dashboard React - v1.0.0 based on Material Dashboard - v1.2.0
 =========================================================

 * Product Page: http://www.creative-tim.com/product/material-dashboard-react
 * Copyright 2018 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */

import React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { sysSizing } from '../../../ui/materialui/styles';

interface ISignUpStyles {
	Container: React.ElementType;
	Content: React.ElementType;
	FormContainer: React.ElementType;
	FormWrapper: React.ElementType;
	HasAccount: React.ElementType;
}

export const signUpStyle: ISignUpStyles = {
	Container: styled(Box)(({ theme }) => ({
		width: '100%',
		backgroundColor: theme.palette.tertiary.main,
		color: theme.palette.primary.contrastText,
		position: 'relative',

		[theme.breakpoints.up('md')]: {
			backgroundImage: 'url(/images/backgroundToDo.png)',
			backgroundSize: 'cover',
			backgroundPosition: 'right',
			minHeight: '100vh'
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
		color: theme.palette.primary.contrastText,

		[theme.breakpoints.up('md')]: {
			width: 'auto',
			height: 'auto',
			position: 'absolute',
			top: '50%',
			left: '10%',
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
	HasAccount: styled(Box)(({ theme }) => ({
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
