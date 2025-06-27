import React from 'react';
import toDoWelcomeStyles from './toDoWelcomeStyles';
import { toDoWelcomeControlerContext } from './toDoWelcomeController';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { ListItem, ListItemText } from '@mui/material';
import { SysButton } from '/imports/ui/components/SimpleFormFields/SysButton/SysButton';

const ToDoWelcomeView = () => {
	const context = React.useContext(toDoWelcomeControlerContext);

	const { Container, Card, CardContent, Title, Description } = toDoWelcomeStyles;

	return (
		<Container>
			<Title variant="h2">Atividades recentes</Title>
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
									<Description variant="body2" color="text.secondary" component={'span'}>
										{item.isCompleted ? 'Tarefa concluída' : 'Tarefa pendente'}
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
