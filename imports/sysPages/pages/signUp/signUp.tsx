// signup component similar to login page (except loginWithPassword)
// instead createUser to insert a new user account document

// login page overrides the form’s submit event and call Meteor’s loginWithPassword()
// Authentication errors modify the component’s state to be displayed
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { userprofileApi } from '../../../modules/userprofile/api/userProfileApi';
import SimpleForm from '/imports/ui/components/SimpleForm/SimpleForm';
import SysTextField from '../../../ui/components/sysFormFields/sysTextField/sysTextField';

import { signUpStyle } from './signUpStyle';
import Box from '@mui/material/Box';
import { IUserProfile } from '/imports/modules/userprofile/api/userProfileSch';
import schema from './signUpSchema';

interface ISignUp {
	showNotification: (options?: Object) => void;
	user: IUserProfile;
}

export const SignUp = (props: ISignUp) => {
	const { showNotification } = props;
	const navigate = useNavigate();

	const handleSubmit = (doc: { email: string; password: string; username: string }) => {
		const { email, password, username } = doc;

		userprofileApi.insertNewUser({ username: username, email, password }, (err, r) => {
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

				navigate('/signIn');
			}
		});
	};

	return (
		<Container style={signUpStyle.containerSignUp}>
			<Box sx={signUpStyle.labelRegisterSystem}>
				<h2>Crie sua conta e aproveite!</h2>
			</Box>
			<SimpleForm schema={schema} onSubmit={handleSubmit}>
				<SysTextField
					id="Username"
					label="Nome do usuario"
					fullWidth
					name="username"
					type="text"
					placeholder="Digite seu nome"
				/>
				<SysTextField id="Email" label="Email" fullWidth name="email" type="email" placeholder="Digite um email" />
				<SysTextField
					id="Senha"
					label="Senha"
					fullWidth
					name="password"
					placeholder="Digite uma senha"
					type="password"
				/>

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
