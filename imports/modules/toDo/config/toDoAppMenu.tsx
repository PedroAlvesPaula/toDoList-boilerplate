import React from 'react';
import { IAppMenu } from '/imports/modules/modulesTypings';
import ListAltIcon from '@mui/icons-material/ListAlt';

export const toDoMenuItemList: (IAppMenu | null)[] = [
	{
		path: '/toDo/welcome',
		name: 'Lista de Tareas',
		icon: <ListAltIcon />
	}
];
