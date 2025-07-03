import React, { useState } from 'react';
import toDoWelcomeStyles from './toDoWelcomeStyles';
import { toDoWelcomeControlerContext } from './toDoWelcomeController';
import { Box, Divider, ListItem, ListItemText, Typography } from '@mui/material';
import { SysButton } from '/imports/ui/components/SimpleFormFields/SysButton/SysButton';
import AuthContext from '/imports/app/authProvider/authContext';
import { TasksCard } from '../../components/tasksCard';

const ToDoWelcomeView = () => {
	const context = React.useContext(toDoWelcomeControlerContext);

	const { user } = React.useContext(AuthContext);

	const { Container, HeaderContainer, TasksContainer, LastAdded, LastAddedTask } = toDoWelcomeStyles;

	return (
		<Container>
			<HeaderContainer>
				<Typography variant="h2" fontSize="3.5rem">
					Olá, {user?.username || 'Sem nome'}
				</Typography>
				<Typography component="p" fontSize="1.1rem" sx={{ margin: '16px 0' }}>
					Seus Projetos mais organizados. Veja as tarefas adicionadas por seu time, por você e para você!
				</Typography>
			</HeaderContainer>

			<Divider variant="inset" component="li" sx={{ listStyle: 'none', width: '100%' }} />
			<TasksContainer>
				<LastAdded>
					<Typography component="p" fontSize="1.1rem" flexDirection="row" fontWeight="bold">
						Adicionadas Recentemente
					</Typography>
					<LastAddedTask>
						<TasksCard tasks={[context.lastTaskAdded]} hideMenu={true} />
					</LastAddedTask>
				</LastAdded>
				<TasksCard tasks={context.lastTasks} hideMenu={true} />
			</TasksContainer>

			<SysButton
				onClick={() => context.navigate('/toDo/tasks')}
				size="small"
				sx={{ margin: '32px 0 16px 0' }}
				stylevariant="secondary">
				Minhas tarefas
			</SysButton>
		</Container>
	);
};

export default ToDoWelcomeView;
