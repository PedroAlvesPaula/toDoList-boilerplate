import React, { useMemo } from 'react';

import { toDoApi } from '../../api/toDoApi';
import { register } from 'module';

import ToDoWelcomeView from './toDoWelcomeView';

interface IToDoWelcomeControllerContext {
	registeredTasks: number;
	inProgressTasks: number;
	completedTasks: number;
}

const toDoWelcomeControlerContext = React.createContext<IToDoWelcomeControllerContext>(
	{} as IToDoWelcomeControllerContext
);

export const ToDoWelcomeController = () => {
	const countTasks = (state: any) => {
		const subHandle = toDoApi.subscribe('toDoCount', state);
		return toDoApi.find({ state: { $eq: state } }).count();
	};

	const registeredTasks = countTasks('cadastrada');
	const inProgressTasks = countTasks('em andamento');
	const completedTasks = countTasks('councluida');

	const providerValues: IToDoWelcomeControllerContext = useMemo(
		() => ({
			registeredTasks,
			inProgressTasks,
			completedTasks
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
