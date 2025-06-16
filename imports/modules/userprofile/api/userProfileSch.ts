import { validarEmail } from '../../../libs/validaEmail';
import { IDoc } from '../../../typings/IDoc';
import { ISchema } from '../../../typings/ISchema';
import User = Meteor.User;

export const userProfileSch: ISchema<IUserProfile> = {
	username: {
		type: String,
		label: 'Username',
		defaultValue: '',
		optional: false
	},
	email: {
		type: String,
		label: 'Email',
		defaultValue: '',
		optional: false,
		validationFunction: (value: string) => {
			if (!value) return undefined;
			const email = validarEmail(value);
			if (!email) return 'Email inválido';
			return undefined;
		}
	},
	password: {
		type: String,
		label: 'Senha',
		optional: false
	},
	dateOfBirth: {
		type: Date,
		label: 'Data de nascimento',
		optional: false
	},
	gender: {
		type: String,
		label: 'Gênero',
		optional: false
	},
	companyWorks: {
		type: String,
		label: 'Empresa onde trabalha',
		optional: false
	},
	profileImage: {
		type: String,
		label: 'Imagem de perfil',
		optional: true
	}
};

export interface IUserProfile extends IDoc {
	username: string;
	email: string;
	password: string;
	dateOfBirth: Date;
	gender: string;
	companyWorks: string;
	profileImage?: string;
}

export interface IMeteorUser extends User {
	services?: {
		password: {
			bcrypt: string; // Senha criptografada (bcrypt hash)
		};
		resume: {
			loginTokens: Array<{
				// Array de tokens de login
				when: Date;
				hashedToken: string;
			}>;
		};
		username: string; // Nome de usuário
	};
	emails: Array<{
		// Array de emails associados ao usuário
		address: string; // Endereço de email
		verified: boolean; // Email verificado ou não
	}>;
	profile?: {
		username: string;
		email: string;
		dateOfBirth: Date;
		gender: string;
		companyWorks: string;
		profileImage?: string;
	};
}
