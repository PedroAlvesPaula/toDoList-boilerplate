import ToDoContainer from '../toDoContainer';
import { Recurso } from './recursos';
import { IRoute } from '/imports/modules/modulesTypings';

export const toDoRouterList: (IRoute | null)[] = [
	{
		path: '/toDo/:screenState/:toDoId',
		component: ToDoContainer,
		isProtected: true,
		resources: [Recurso.EXAMPLE_VIEW]
	},
	{
		path: '/toDo/:screenState',
		component: ToDoContainer,
		isProtected: true,
		resources: [Recurso.EXAMPLE_CREATE]
	},
	{
		path: '/toDo',
		component: ToDoContainer,
		isProtected: true,
		resources: [Recurso.EXAMPLE_VIEW]
	}
];
