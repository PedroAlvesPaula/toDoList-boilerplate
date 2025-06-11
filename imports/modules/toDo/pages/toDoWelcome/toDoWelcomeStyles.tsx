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

interface IToDoWelcomeStyles {
	Container: ElementType<GridProps>;
	Card: ElementType<GridProps>;
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

	Card: styled(Grid)(() => ({
		width: '50vw'
	})),

	CardContent: styled(Card)({
		width: 'stretch',
		minHeight: 150,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column' as const,
		margin: '16px 0 16px 0'
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
