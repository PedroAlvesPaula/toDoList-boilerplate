import React from 'react';
import toDoWelcomeStyles from './toDoWelcomeStyles';
import { toDoWelcomeControlerContext } from './toDoWelcomeController';

const ToDoWelcomeView = () => {
	const context = React.useContext(toDoWelcomeControlerContext);

	const { Container, Card, CardContent, InformationCard, Title, Count, Description } = toDoWelcomeStyles;

	const data = [
		{
			tite: 'Tarefas Registradas',
			count: context.registeredTasks,
			description: 'Tarefas que foram registradas mas ainda não iniciadas.'
		},
		{
			tite: 'Tarefas em Progresso',
			count: context.inProgressTasks,
			description: 'Tarefas que estão atualmente em andamento.'
		},
		{
			tite: 'Tarefas Concluídas',
			count: context.completedTasks,
			description: 'Tarefas que foram concluídas com sucesso.'
		}
	];

	return (
		<Container>
			{data.map((item, index) => (
				<Card key={index}>
					<CardContent>
						<InformationCard>
							<Title variant="h5">{item.tite}</Title>
							<Count variant="h6">{item.count}</Count>
							<Description variant="body1">{item.description}</Description>
						</InformationCard>
					</CardContent>
				</Card>
			))}
			<Card>
				<CardContent>
					<InformationCard>
						<Title variant="h5">Ir para as tarefas</Title>
						<Count variant="h6">clique aqui</Count>
						<Description variant="body1">Clique para visualizar todas tarefas</Description>
					</InformationCard>
				</CardContent>
			</Card>
		</Container>
	);
};

export default ToDoWelcomeView;
