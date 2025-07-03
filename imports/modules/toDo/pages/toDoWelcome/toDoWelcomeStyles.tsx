import { ElementType } from 'react';
import {
	Grid,
	Card,
	CardContent,
	Typography,
	GridProps,
	CardProps,
	CardContentProps,
	TypographyProps,
	BoxProps,
	Box
} from '@mui/material';
import styled from '@emotion/styled';
import { Theme } from '@mui/material/styles';

interface IToDoWelcomeStyles {
	Container: ElementType<GridProps>;
	Card: ElementType<CardProps>;
	CardContent: ElementType<CardProps>;
	InformationCard: ElementType<CardContentProps>;
	HeaderContainer: ElementType<BoxProps>;
	TasksContainer: ElementType<BoxProps>;
	LastAdded: ElementType<BoxProps>;
	LastAddedTask: ElementType<BoxProps>;
}

const toDoWelcomeStyles: IToDoWelcomeStyles = {
	Container: styled(Grid)(({ theme }) => ({
		boxSizing: 'border-box' as const,
		width: '100vw',
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column' as const,
		paddingTop: '32px',
		backgroundColor: theme.palette.secondary.light
	})),
	Card: styled(Card)(({ theme }) => ({
		width: '50vw',
		display: 'flex',
		flexDirection: 'row',
		[theme.breakpoints.down('sm')]: {
			width: '80vw'
		},
		boxShadow: 'none',
		borderRadius: '0px',
		border: 'none',
		backgroundColor: theme.palette.secondary.light
	})),

	CardContent: styled(Card)(({ theme }) => ({
		width: 'stretch',
		minHeight: 150,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row' as const,
		margin: '16px 0 16px 0',
		textAlign: 'right' as const,
		color: theme.palette.text.primary,
		boxShadow: 'none'
	})),

	InformationCard: styled(CardContent)(() => ({
		textAlign: 'center' as const,
		width: '100%'
	})),
	HeaderContainer: styled(Box)(({ theme }) => ({
		width: '90%'
	})),
	TasksContainer: styled(Box)(({ theme }) => ({
		width: '70%',
		[theme.breakpoints.down('md')]: {
			width: '90%'
		}
	})),
	LastAdded: styled(Box)(({ theme }) => ({
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: '32px',
		[theme.breakpoints.down('md')]: {
			flexDirection: 'column',
			margin: '16px 0 0 0'
		}
	})),
	LastAddedTask: styled(Box)(({ theme }) => ({
		width: '70%',
		[theme.breakpoints.down('md')]: {
			width: '100%',
			gap: '16px'
		}
	}))
};

export default toDoWelcomeStyles;
