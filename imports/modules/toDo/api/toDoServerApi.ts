// region Imports
import { Recurso } from '../config/recursos';
import { toDoSch, IToDo } from './toDoSch';
import { userprofileServerApi } from '/imports/modules/userprofile/api/userProfileServerApi';
import { ProductServerBase } from '/imports/api/productServerBase';
import { Description } from '@mui/icons-material';
import { create, last } from 'lodash';

// endregion

class ToDoServerApi extends ProductServerBase<IToDo> {
	constructor() {
		super('toDo', toDoSch, {
			resources: Recurso
			// saveImageToDisk: true,
		});

		const self = this;

		this.addTransformedPublication(
			'toDoDetail',
			(filter = {}) => {
				const userId = Meteor.userId();
				return this.defaultListCollectionPublication(
					{
						...filter,
						$or: [{ ownerId: userId }, { isPrivate: false }]
					},
					{
						projection: { title: 1, isCompleted: 1, isPrivate: 1, createdat: 1, description: 1, ownerId: 1 }
					}
				);
			},
			(doc: IToDo & { nomeUsuario: string }) => {
				const userProfileDoc = userprofileServerApi.getCollectionInstance().findOneAsync({ _id: doc.createdby });
				return { ...doc };
			}
		);

		this.addTransformedPublication(
			'toDoLastFive',
			(filter = {}) => {
				const userId = Meteor.userId();
				return this.defaultListCollectionPublication(
					{
						...filter,
						$or: [{ ownerId: userId }, { isPrivate: false }]
					},
					{
						sort: { lastupdate: -1, createdat: -1 },
						limit: 5
					}
				);
			},
			(doc: IToDo) => {
				return { ...doc };
			}
		);

		this.addTransformedPublication(
			'toDoList',
			async (filter = {}, options: { page?: number }) => {
				const page = options.page ?? 0;
				const limit = 4;
				const skip: number = page * limit;

				const userId = Meteor.userId();

				return this.defaultListCollectionPublication(
					{
						...filter,
						$or: [{ ownerId: userId }, { isPrivate: false }]
					},
					{
						...options,
						limit: limit,
						skip: skip,
						sort: { createdat: -1 },
						projection: {
							title: 1,
							isCompleted: 1,
							isPrivate: 1,
							createdat: 1,
							ownerId: 1,
							description: 1
						}
					}
				);
			},
			async (doc: IToDo) => {
				const user = await userprofileServerApi.findOne({ _id: doc.ownerId });

				if (user) {
					doc.ownerName = user.username;
				}

				return doc;
			}
		);

		// this.addPublication('toDoDetail', (filter = {}) => {
		// 	return this.defaultDetailCollectionPublication(filter, {
		// 		projection: {
		// 			title: 1,
		// 			description: 1,
		// 			state: 1,
		// 			isPrivate: 1
		// 		}
		// 	});
		// });

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

	public async countTasks(state: string): Promise<number> {
		return this.countDocuments({ state: { $eq: state } });
	}
}

export const toDoServerApi = new ToDoServerApi();
