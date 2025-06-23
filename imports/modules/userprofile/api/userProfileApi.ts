// region Imports
import { Meteor } from 'meteor/meteor';
import { OfflineBaseApi } from '../../../api/offlinebase';
import { userProfileSch } from './userProfileSch';
import { userprofileData } from '/imports/libs/getUser';
import { IMeteorError } from '/imports/typings/BoilerplateDefaultTypings';

// endregion

class UserProfileApi extends OfflineBaseApi {
	constructor() {
		super('userprofile', userProfileSch);
		this.registrarUserProfileNoMeteor = this.registrarUserProfileNoMeteor.bind(this);
		this.serverInsert = this.serverInsert.bind(this);
		this.noImagePath = `${Meteor.absoluteUrl()}images/wireframe/user_no_photo.png`;
		// @ts-ignore
		userprofileData.collectionInstance = this.collectionInstance; //create globalvar userprofileData
	}

	registrarUserProfileNoMeteor(
		userData: {
			username: string;
			email: string;
			password?: string;
			profile: { dateOfBirth?: string; gender?: string; companyWorks?: string; profileImage?: string };
		},
		callback = (e: Error, r: any) => {
			console.log(e, r);
		}
	) {
		this.callMethod('registrarUserProfileNoMeteor', userData, callback);
	}

	serverInsert(
		dataObj: {
			username: string;
			email: string;
			password?: string;
			profile: { dateOfBirth?: string; gender?: string; companyWorks?: string; profileImage?: string };
		},
		callback = (e: IMeteorError, r: any) => {
			console.log('Erro no server insert');
			console.log(e, r);
		}
	) {
		console.log('passou pelo serverInsert');
		this.callMethod('serverInsert', dataObj, callback);
	}

	insertNewUser(
		userData: {
			username: string;
			email: string;
			password: string;
		},
		callback = (e: IMeteorError, r: any) => {
			console.log('Erro no insertNewUser');
			console.log(e, r);
		}
	) {
		console.log('passou pelo insertNewUser');
		return this.callMethod('insert', userData, callback);
	}

	changeUserStatus(id: string, callback = (e: IMeteorError, r: any) => {}) {
		return this.callMethod('ChangeUserStatus', id, callback);
	}
}

export const userprofileApi = new UserProfileApi();
