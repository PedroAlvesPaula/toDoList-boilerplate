import React from 'react';
import { IAppMenu } from '/imports/modules/modulesTypings';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Home } from '@mui/icons-material';

export const toDoMenuItemList: (IAppMenu | null)[] = [
	{
		path: '/toDo/tasks',
		name: 'Minhas tarefas',
		icon: <ListAltIcon />
	},
	{
		path: '/toDo/welcome',
		name: 'Início',
		icon: <Home />
	}
];
