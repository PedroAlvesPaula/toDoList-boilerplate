import UserProfileContainer from '../userProfileContainer';
import { IRoute } from '../../../modules/modulesTypings';
import { Recurso } from './recurso';

export const userProfileRouterList: (IRoute | null)[] = [
	{
		path: '/userProfile/:screenState/:userprofileId',
		component: UserProfileContainer,
		isProtected: true,
		resources: [Recurso.USUARIO_VIEW]
	},
	{
		path: '/userProfile/:screenState',
		component: UserProfileContainer,
		isProtected: true,
		resources: [Recurso.USUARIO_VIEW]
	},
	{
		path: '/userProfile',
		component: UserProfileContainer,
		isProtected: true,
		resources: [Recurso.USUARIO_VIEW]
	}
];
