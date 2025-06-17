import { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import { IconButton, IconButtonProps } from '@mui/material';

interface IToDoListStyles {
	ButtonToClick: ElementType<IconButtonProps>;
}

const ToDoListStyles: IToDoListStyles = {
	ButtonToClick: styled(IconButton)(() => ({
		marginLeft: '10px',
		'&:hover': {
			cursor: 'pointer'
		},
		width: '24px',
		height: '24px',
		padding: '0',
		color: 'rgb(103, 104, 242);'
	}))
};

export default ToDoListStyles;
