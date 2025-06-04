import React from 'react';
import { IDefaultContainerProps } from '/imports/typings/BoilerplateDefaultTypings';
import { useParams } from 'react-router-dom';
import ToDoListController from '/imports/modules/toDo/pages/toDoList/toDoListController';
import ToDoDetailController from '/imports/modules/toDo/pages/toDoDetail/toDoDetailContoller';

export interface IToDoModuleContext {
	state?: string;
	id?: string;
}

export const ToDoModuleContext = React.createContext<IToDoModuleContext>({});

export default (props: IDefaultContainerProps) => {
	let { screenState, toDoId } = useParams();
	const state = screenState ?? props.screenState;
	const id = toDoId ?? props.id;

	const validState = ['view', 'edit', 'create'];

	const renderPage = () => {
		if (!state || !validState.includes(state)) return <ToDoListController />;
		return <ToDoDetailController />;
	};

	const providerValue = {
		state,
		id
	};
	return <ToDoModuleContext.Provider value={providerValue}>{renderPage()}</ToDoModuleContext.Provider>;
};
