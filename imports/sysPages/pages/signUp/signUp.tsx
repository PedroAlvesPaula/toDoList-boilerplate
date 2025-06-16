// signup component similar to login page (except loginWithPassword)
// instead createUser to insert a new user account document

// login page overrides the form’s submit event and call Meteor’s loginWithPassword()
// Authentication errors modify the component’s state to be displayed
import React from 'react';
import { Link, NavigateFunction } from 'react-router-dom';
import Container from '@mui/material/Container';
import TextField from '/imports/ui/components/SimpleFormFields/TextField/TextField';
import Button from '@mui/material/Button';
import { userprofileApi } from '../../../modules/userprofile/api/userProfileApi';
import SimpleForm from '/imports/ui/components/SimpleForm/SimpleForm';

import { signUpStyle } from './signUpStyle';
import Box from '@mui/material/Box';
import { IUserProfile } from '/imports/modules/userprofile/api/userProfileSch';
import schema from './signUpSchema';
import { Password } from '@mui/icons-material';
import { parse } from 'path';

interface ISignUp {
	showNotification: (options?: Object) => void;
	navigate: NavigateFunction;
	user: IUserProfile;
}

export const SignUp = (props: ISignUp) => {
	const { showNotification } = props;

	const handleSubmit = (doc: {
		email: string;
		password: string;
		username: string;
		dateOfBirth: Date;
		gender: string;
		companyWorks: string;
		profileImage?: string;
	}) => {
		const { email, password, username, dateOfBirth, gender, companyWorks, profileImage } = doc;

		const parsedDateOfBirth = dateOfBirth ? new Date(dateOfBirth) : undefined;

		const data = {
			email,
			password,
			username,
			profile: {
				dateOfBirth: parsedDateOfBirth ? parsedDateOfBirth.toISOString() : undefined,
				gender,
				companyWorks,
				profileImage
			}
		};

		console.log('SignUp data:', data);

		userprofileApi.registrarUserProfileNoMeteor(data, (err, r) => {
			if (err) {
				console.log('Login err', err);
				showNotification &&
					showNotification({
						type: 'warning',
						title: 'Problema na criação do usuário!',
						description: 'Erro ao fazer registro em nossa base de dados!'
					});
			} else {
				showNotification &&
					showNotification({
						type: 'sucess',
						title: 'Cadastrado com sucesso!',
						description: 'Registro de usuário realizado em nossa base de dados!'
					});
			}
		});
	};

	return (
		<Container style={signUpStyle.containerSignUp}>
			<Box sx={signUpStyle.labelRegisterSystem}>
				<h2>Crie sua conta e aproveite!</h2>
			</Box>
			<SimpleForm schema={schema} onSubmit={handleSubmit}>
				<TextField
					id="Username"
					label="Nome do usuario"
					fullWidth
					name="username"
					type="text"
					placeholder="Digite seu nome"
				/>
				<TextField id="Email" label="Email" fullWidth name="email" type="email" placeholder="Digite um email" />
				<TextField
					id="dateOfBirth"
					label="Data de nascimento"
					fullWidth
					name="dateOfBirth"
					type="date"
					placeholder="00/00/0000"
				/>
				<TextField id="Gender" label="Gênero" fullWidth name="gender" type="text" placeholder="Masculino | Feminino" />
				<TextField
					id="CompanyWorks"
					label="Empresa onde trabalha"
					fullWidth
					name="companyWorks"
					type="text"
					placeholder="ex: Synergia"
				/>
				{/* Genero */}
				<TextField id="ProfileImage" label="Imagem de perfil" fullWidth name="profileImage" type="file" />
				<TextField id="Senha" label="Senha" fullWidth name="password" placeholder="Digite uma senha" type="password" />

				<Box sx={signUpStyle.containerButtonOptions}>
					<Button color={'primary'} variant={'outlined'} id="submit">
						Cadastrar
					</Button>
				</Box>
			</SimpleForm>
			<Box sx={signUpStyle.containerRouterSignIn}>
				Já tem uma conta? Faça login clicando{' '}
				<Link to="/signin" color={'secondary'}>
					aqui
				</Link>
			</Box>
		</Container>
	);
};
