import React, { useMemo } from 'react';

import { toDoApi } from '../../api/toDoApi';

import ToDoWelcomeView from './toDoWelcomeView';
import { useTracker } from 'meteor/react-meteor-data';
import { IToDo } from '../../api/toDoSch';
import { useNavigate, NavigateFunction } from 'react-router-dom';

interface IToDoWelcomeControllerContext {
	lastTasks: IToDo[];
	lastTaskAdded: IToDo;
	navigate: NavigateFunction;
}

const toDoWelcomeControlerContext = React.createContext<IToDoWelcomeControllerContext>(
	{} as IToDoWelcomeControllerContext
);

export const ToDoWelcomeController = () => {
	const navigate = useNavigate();
	const { lastTasks, lastTaskAdded } = useTracker(() => {
		const handle = toDoApi.subscribe('toDoLastFive', {});
		const lastTasks = handle?.ready() ? toDoApi.find({}).fetch() : [];
		const lastTaskAdded = lastTasks.length > 0 ? lastTasks.shift() : [];

		return { lastTasks, lastTaskAdded };
	}, []);

	const providerValues: IToDoWelcomeControllerContext = useMemo(
		() => ({
			lastTasks: lastTasks,
			lastTaskAdded: lastTaskAdded,
			navigate: navigate
		}),
		[lastTasks, lastTaskAdded, navigate]
	);

	return (
		<toDoWelcomeControlerContext.Provider value={providerValues}>
			<ToDoWelcomeView />
		</toDoWelcomeControlerContext.Provider>
	);
};

export { toDoWelcomeControlerContext };
