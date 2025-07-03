import { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import { sysSizing } from '/imports/ui/materialui/styles';
import { SysSectionPaddingXY } from '/imports/ui/layoutComponents/sysLayoutComponents';
import { Button, ButtonProps } from '@mui/material';

interface IToDoListStyles {
	Container: ElementType<BoxProps>;
	LoadingContainer: ElementType<BoxProps>;
	SearchContainer: ElementType<BoxProps>;
	ContainerSwitch: ElementType<BoxProps>;
	NavigateButtonsContainer: ElementType<BoxProps>;
	ButtonsNavigate: ElementType<ButtonProps>;
}

const ToDoListStyles: IToDoListStyles = {
	Container: styled(SysSectionPaddingXY)(({ theme }) => ({
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: '100%',
		height: '100vh',
		overflow: 'auto',
		gap: sysSizing.spacingFixedMd,
		marginBottom: sysSizing.contentFabDistance,
		backgroundColor: theme.palette.secondary.light
	})),
	LoadingContainer: styled(Box)(({ theme }) => ({
		width: '100%',
		display: 'flex',
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		gap: theme.spacing(2),
		backgroundColor: theme.palette.secondary.light
	})),
	SearchContainer: styled(Box)(({ theme }) => ({
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-end',
		maxWidth: '616px',
		gap: sysSizing.spacingFixedMd,
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column'
		},
		backgroundColor: theme.palette.secondary.light
	})),
	ContainerSwitch: styled(Box)(({ theme }) => ({
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		justifyContent: 'center',
		fontWeight: 'bold',
		fontSize: '16px'
	})),
	NavigateButtonsContainer: styled(Box)(({ theme }) => ({
		display: 'flex',
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		[theme.breakpoints.down('sm')]: {}
	})),
	ButtonsNavigate: styled(Button)(({ theme }) => ({
		':focus': {
			color: theme.palette.primary.contrastText,
			backgroundColor: theme.palette.secondary.dark
		}
	}))
};

export default ToDoListStyles;
