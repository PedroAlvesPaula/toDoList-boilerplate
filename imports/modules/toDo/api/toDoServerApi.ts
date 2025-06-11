// region Imports
import { Recurso } from '../config/recursos';
import { toDoSch, IToDo } from './toDoSch';
import { userprofileServerApi } from '/imports/modules/userprofile/api/userProfileServerApi';
import { ProductServerBase } from '/imports/api/productServerBase';

// endregion

class ToDoServerApi extends ProductServerBase<IToDo> {
	constructor() {
		super('toDo', toDoSch, {
			resources: Recurso
			// saveImageToDisk: true,
		});

		const self = this;

		this.addTransformedPublication(
			'toDoList',
			(filter = {}) => {
				return this.defaultListCollectionPublication(filter, {
					projection: { title: 1, state: 1, isPrivate: 1, createdat: 1 }
				});
			},
			(doc: IToDo & { nomeUsuario: string }) => {
				const userProfileDoc = userprofileServerApi.getCollectionInstance().findOneAsync({ _id: doc.createdby });
				return { ...doc };
			}
		);

		this.addPublication('toDoDetail', (filter = {}) => {
			return this.defaultDetailCollectionPublication(filter, {
				projection: {
					title: 1,
					description: 1,
					state: 1,
					isPrivate: 1
				}
			});
		});

		this.addPublication('toDoCount', (filter = {}) => {
			return this.defaultCounterCollectionPublication(filter, 'toDo');
		});

		// this.addRestEndpoint(
		// 	'view',
		// 	(params, options) => {
		// 		console.log('Params', params);
		// 		console.log('options.headers', options.headers);
		// 		return { status: 'ok' };
		// 	},
		// 	['post']
		// );

		// this.addRestEndpoint(
		// 	'view/:toDoId',
		// 	(params, _options) => {
		// 		console.log('Rest', params);
		// 		if (params.toDoId) {
		// 			return self.defaultCollectionPublication(
		// 				{
		// 					_id: params.toDoId
		// 				},
		// 				{}
		// 			);
		// 			// .fetch();
		// 		} else {
		// 			return { ...params };
		// 		}
		// 	},
		// 	['get']
		// );
	}
}

export const toDoServerApi = new ToDoServerApi();
