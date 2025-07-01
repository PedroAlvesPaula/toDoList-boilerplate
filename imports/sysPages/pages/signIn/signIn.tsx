import React, { useContext, useEffect } from 'react';
import SignInStyles, { sxButton, sxTextField } from './signInStyles';
import { useNavigate } from 'react-router-dom';
import SysTextField from '../../../ui/components/sysFormFields/sysTextField/sysTextField';
import SysForm from '../../../ui/components/sysForm/sysForm';
import SysFormButton from '../../../ui/components/sysFormFields/sysFormButton/sysFormButton';
import { signInSchema } from './signinsch';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SysIcon from '../../../ui/components/sysIcon/sysIcon';
import AuthContext, { IAuthContext } from '/imports/app/authProvider/authContext';
import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';

import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';

const SignInPage: React.FC = () => {
	const { showNotification } = useContext(AppLayoutContext);
	const { user, signIn } = useContext<IAuthContext>(AuthContext);
	const navigate = useNavigate();
	const { Container, Content, FormContainer, FormWrapper, TextContainer } = SignInStyles;

	const handleSubmit = ({ email, password }: { email: string; password: string }) => {
		signIn(email, password, (err) => {
			if (!err) navigate('/toDo/welcome');
			else
				showNotification({
					type: 'error',
					title: 'Erro ao tentar logar',
					message: 'Email ou senha inválidos'
				});
		});
	};

	const handleForgotPassword = () => navigate('/password-recovery');

	useEffect(() => {
		if (user) navigate('/toDo/welcome');
	}, [user]);

	return (
		<Container>
			<Content>
				<Typography variant="h1" display={'inline-flex'} gap={1} textAlign="center">
					ToDo List
				</Typography>
				<Typography variant="h6" display={'inline-flex'} gap={1} textAlign="center">
					Boas vindas a sua lista de tarefas. <br />
					Insira seu e-mail e senha para efetuar o login:
				</Typography>

				<FormContainer>
					<Typography variant="h5">Faça login</Typography>
					<SysForm schema={signInSchema} onSubmit={handleSubmit} debugAlerts={false}>
						<FormWrapper>
							<SysTextField name="email" label="Email" fullWidth placeholder="Digite seu email" sxMap={sxTextField} />
							<SysTextField
								label="Senha"
								fullWidth
								name="password"
								placeholder="Digite sua senha"
								type="password"
								sxMap={sxTextField}
							/>
							<Box />
						</FormWrapper>
						<SysFormButton
							sx={sxButton}
							variant="contained"
							color="primary"
							endIcon={<SysIcon name={'arrowForward'} />}>
							Entrar
						</SysFormButton>
					</SysForm>
				</FormContainer>
				<TextContainer>
					Esqueceu sua senha? <Link to={'/signUp'}> Clique aqui</Link>
				</TextContainer>
				<TextContainer>
					Novo por aqui? <Link to={'/signUp'}> Cadastre-se</Link>
				</TextContainer>
			</Content>
		</Container>
	);
};

export default SignInPage;
