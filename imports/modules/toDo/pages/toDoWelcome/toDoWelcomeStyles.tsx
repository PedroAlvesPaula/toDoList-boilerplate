import { ElementType } from 'react';
import {
	Grid,
	Card,
	CardContent,
	Typography,
	GridProps,
	CardProps,
	CardContentProps,
	TypographyProps
} from '@mui/material';
import styled from '@emotion/styled';
import { Theme } from '@mui/material/styles';

interface IToDoWelcomeStyles {
	Container: ElementType<GridProps>;
	Card: ElementType<CardProps>;
	CardContent: ElementType<CardProps>;
	InformationCard: ElementType<CardContentProps>;
	Title: ElementType<TypographyProps>;
	Count: ElementType<TypographyProps>;
	Description: ElementType<TypographyProps>;
}

const toDoWelcomeStyles: IToDoWelcomeStyles = {
	Container: styled(Grid)(() => ({
		boxSizing: 'border-box' as const,
		width: '100vw',
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column' as const,
		marginTop: '32px'
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
		border: 'none'
	})),

	CardContent: styled(Card)({
		width: 'stretch',
		minHeight: 150,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row' as const,
		margin: '16px 0 16px 0',
		textAlign: 'right' as const
	}),

	InformationCard: styled(CardContent)(() => ({
		textAlign: 'center' as const,
		width: '100%'
	})),
	Title: styled(Typography)(() => ({})),
	Count: styled(Typography)(() => ({})),
	Description: styled(Typography)(() => ({}))
};

export default toDoWelcomeStyles;
