import React, { useMemo } from 'react';

import { toDoApi } from '../../api/toDoApi';
import { register } from 'module';

import ToDoWelcomeView from './toDoWelcomeView';

interface IToDoWelcomeControllerContext {
	registeredTasks: number;
	inProgressTasks: number;
	completedTasks: number;
	name: string;
}

const toDoWelcomeControlerContext = React.createContext<IToDoWelcomeControllerContext>(
	{} as IToDoWelcomeControllerContext
);

export const ToDoWelcomeController = () => {
	const countTasks = (state: any) => {
		const subHandle = toDoApi.subscribe('toDoCount', state);
		return subHandle?.ready() ? toDoApi.find({}).count() : 0;
	};

	const registeredTasks = countTasks({ state: 'registered' });
	const inProgressTasks = countTasks({ state: 'inProgress' });
	const completedTasks = countTasks({ state: 'completed' });

	const providerValues: IToDoWelcomeControllerContext = useMemo(
		() => ({
			registeredTasks,
			inProgressTasks,
			completedTasks,
			name: 'pedro'
		}),
		[registeredTasks, inProgressTasks, completedTasks]
	);

	return (
		<toDoWelcomeControlerContext.Provider value={providerValues}>
			<ToDoWelcomeView />
		</toDoWelcomeControlerContext.Provider>
	);
};

export { toDoWelcomeControlerContext };
