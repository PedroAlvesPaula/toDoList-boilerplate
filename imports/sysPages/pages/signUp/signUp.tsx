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
import { Typography } from '@mui/material';
import SysForm from '/imports/ui/components/sysForm/sysForm';
import SysFormButton from '/imports/ui/components/sysFormFields/sysFormButton/sysFormButton';

interface ISignUp {
	showNotification: (options?: Object) => void;
	user: IUserProfile;
}

export const SignUp = (props: ISignUp) => {
	const { showNotification } = props;
	const navigate = useNavigate();

	const { Container, Content, FormContainer, FormWrapper, HasAccount } = signUpStyle;

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
		<Container>
			<Content>
				<Typography variant="h1" display={'inline-flex'} gap={1} textAlign="center" fontSize="28px">
					Crie sua conta e aproveite
				</Typography>
				<FormContainer>
					<SysForm schema={schema} onSubmit={handleSubmit}>
						<FormWrapper>
							<SysTextField
								id="Username"
								label="Nome do usuario"
								fullWidth
								name="username"
								type="text"
								placeholder="Digite seu nome"
							/>
							<SysTextField
								id="Email"
								label="Email"
								fullWidth
								name="email"
								type="email"
								placeholder="Digite um email"
							/>
							<SysTextField
								id="Senha"
								label="Senha"
								fullWidth
								name="password"
								placeholder="Digite uma senha"
								type="password"
							/>
						</FormWrapper>
						<SysFormButton variant="contained" color="primary">
							Entrar
						</SysFormButton>
					</SysForm>
				</FormContainer>
				<HasAccount>
					Já tem uma conta? Faça login clicando{' '}
					<Link to="/signin" color={'secondary'}>
						aqui
					</Link>
				</HasAccount>
			</Content>
		</Container>
	);
};
