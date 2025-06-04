import React from 'react';
import { IAppMenu } from '/imports/modules/modulesTypings';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';

export const toDoMenuItemList: (IAppMenu | null)[] = [
	{
		path: '/toDo',
		name: 'ToDo',
		icon: <SysIcon name={'dashboard'} />
	}
];
