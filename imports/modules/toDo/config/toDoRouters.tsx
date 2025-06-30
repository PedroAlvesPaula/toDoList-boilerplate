import { ToDoWelcomeController } from '../pages/toDoWelcome/toDoWelcomeController';
import ToDoContainer from '../toDoContainer';
import { Recurso } from './recursos';
import { IRoute } from '/imports/modules/modulesTypings';

export const toDoRouterList: (IRoute | null)[] = [
	{
		path: '/toDo/:screenState/:toDoId',
		component: ToDoContainer,
		isProtected: true,
		resources: [Recurso.TODO_VIEW],
		templateVariant: 'None'
	},
	{
		path: '/toDo/:screenState',
		component: ToDoContainer,
		isProtected: true,
		resources: [Recurso.TODO_CREATE]
	},
	{
		path: '/toDo/tasks',
		component: ToDoContainer,
		isProtected: true,
		resources: [Recurso.TODO_VIEW]
	},
	{
		path: '/',
		component: ToDoWelcomeController,
		isProtected: true,
		resources: [Recurso.TODO_VIEW]
	}
];
