import React from 'react';
import toDoWelcomeStyles from './toDoWelcomeStyles';
import { toDoWelcomeControlerContext } from './toDoWelcomeController';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { ListItem, ListItemText } from '@mui/material';
import { SysButton } from '/imports/ui/components/SimpleFormFields/SysButton/SysButton';

const ToDoWelcomeView = () => {
	const context = React.useContext(toDoWelcomeControlerContext);

	const { Container, Card, CardContent, Title, Description } = toDoWelcomeStyles;

	console.log('ToDoWelcomeView context', context);

	return (
		<Container>
			<Title variant="h2">Atividades recentes</Title>
			<SysButton size="small" onClick={() => context.navigate('/toDo/tasks')} sx={{ marginTop: '16px' }}>
				Minhas tarefas
			</SysButton>
			{context.fiveLastTasks.map((item, index) => (
				<Card key={index}>
					<CardContent>
						<AssignmentIcon fontSize="large" />
						<ListItem sx={{ textAlign: 'center' }}>
							<ListItemText
								primary={
									<Title variant="h5" component="div">
										{item.title}
									</Title>
								}
								secondary={
									<Description variant="body2" color="text.secondary">
										{item.isCompleted}
									</Description>
								}
							/>
						</ListItem>
					</CardContent>
				</Card>
			))}
		</Container>
	);
};

export default ToDoWelcomeView;
