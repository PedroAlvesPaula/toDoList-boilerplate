import React, { useMemo } from 'react';

import { toDoApi } from '../../api/toDoApi';

import ToDoWelcomeView from './toDoWelcomeView';
import { useTracker } from 'meteor/react-meteor-data';
import { IToDo } from '../../api/toDoSch';
import { useNavigate, NavigateFunction } from 'react-router-dom';

interface IToDoWelcomeControllerContext {
	fiveLastTasks: IToDo[];
	navigate: NavigateFunction;
}

const toDoWelcomeControlerContext = React.createContext<IToDoWelcomeControllerContext>(
	{} as IToDoWelcomeControllerContext
);

export const ToDoWelcomeController = () => {
	const navigate = useNavigate();
	const fiveLastTasks = useTracker(() => {
		const handle = toDoApi.subscribe('toDoLastFive', {});
		const tasks = handle?.ready() ? toDoApi.find({}).fetch() : [];
		return tasks;
	}, []);

	const providerValues: IToDoWelcomeControllerContext = useMemo(
		() => ({
			fiveLastTasks: fiveLastTasks,
			navigate: navigate
		}),
		[fiveLastTasks, navigate]
	);

	return (
		<toDoWelcomeControlerContext.Provider value={providerValues}>
			<ToDoWelcomeView />
		</toDoWelcomeControlerContext.Provider>
	);
};

export { toDoWelcomeControlerContext };
