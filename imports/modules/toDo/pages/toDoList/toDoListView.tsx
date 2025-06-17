import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { SysFab } from '/imports/ui/components/sysFab/sysFab';
import { ToDoListControllerContext } from './toDoListController';
import { useNavigate } from 'react-router-dom';
import { ComplexTable } from '/imports/ui/components/ComplexTable/ComplexTable';
import DeleteDialog from '/imports/ui/appComponents/showDialog/custom/deleteDialog/deleteDialog';
import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';
import ToDoListStyles from './toDoListStyles';
import SysTextField from '/imports/ui/components/sysFormFields/sysTextField/sysTextField';
import { SysSelectField } from '/imports/ui/components/sysFormFields/sysSelectField/sysSelectField';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import { TasksCard } from '/imports/modules/toDo/components/tasksCard';
import { IToDo } from '../../api/toDoSch';

const ToDoListView = () => {
	const controller = React.useContext(ToDoListControllerContext);
	const sysLayoutContext = React.useContext(AppLayoutContext);
	const navigate = useNavigate();
	const { Container, LoadingContainer, SearchContainer } = ToDoListStyles;

	const options = [{ value: '', label: 'Nenhum' }, ...(controller.schema.state.options?.() ?? [])];

	const tasks: IToDo[] = [
		{
			title: 'Tarefa 1',
			owner: 'Usuário 1',
			isPrivate: 'sim',
			description: 'Descrição da tarefa 1',
			state: 'cadastrada'
		},
		{
			title: 'Tarefa 2',
			owner: 'Usuário 2',
			isPrivate: 'sim',
			description: 'Descrição da tarefa 2',
			state: 'em andamento'
		},
		{
			title: 'Tarefa 3',
			owner: 'Usuário 3',
			isPrivate: 'nao',
			description: 'Descrição da tarefa 3',
			state: 'concluida'
		}
	];

	return (
		<Container>
			<TasksCard
				tasks={controller.todoList}
				onDelete={controller.onDeleteButtonClick}
				onEdit={(task) => navigate('/toDo/edit/' + task._id)}
				onChangeState={controller.onChangeStateButtonClick}
				onResetState={controller.onResetStateClick}
			/>
			<SysFab
				variant="extended"
				text="Adicionar"
				startIcon={<SysIcon name={'add'} />}
				fixed={true}
				onClick={controller.onAddButtonClick}
			/>
		</Container>

		// <Container>
		// 	<Typography variant="h5">Lista de tarefas</Typography>
		// 	<SearchContainer>
		// 		<SysTextField
		// 			name="search"
		// 			placeholder="Pesquisar por nome"
		// 			onChange={controller.onChangeTextField}
		// 			startAdornment={<SysIcon name={'search'} />}
		// 		/>
		// 		<SysSelectField
		// 			name="Category"
		// 			label="Estágio"
		// 			options={options}
		// 			placeholder="Selecionar"
		// 			onChange={controller.onChangeCategory}
		// 		/>
		// 	</SearchContainer>
		// 	{controller.loading ? (
		// 		<LoadingContainer>
		// 			<CircularProgress />
		// 			<Typography variant="body1">Aguarde, carregando informações...</Typography>
		// 		</LoadingContainer>
		// 	) : (
		// 		<Box sx={{ width: '100%' }}>
		// <ComplexTable
		// 				data={controller.todoList}
		// 				schema={controller.schema}
		// 				onRowClick={(row) => navigate('/toDo/view/' + row.id)}
		// 				searchPlaceholder={'Pesquisar exemplo'}
		// 				onEdit={(row) => navigate('/toDo/edit/' + row._id)}
		// 				actions={[
		// 					{
		// 						icon: <SysIcon name="arrowForward" />,
		// 						label: 'avançar estágio',
		// 						onClick: controller.onChangeStateButtonClick
		// 					},
		// 					{
		// 						icon: <SysIcon name="refresh" />,
		// 						label: 'resetar estágio',
		// 						onClick: controller.onResetStateClick
		// 					}
		// 				]}
		// 				onDelete={(row) => {
		// 					DeleteDialog({
		// 						showDialog: sysLayoutContext.showDialog,
		// 						closeDialog: sysLayoutContext.closeDialog,
		// 						title: `Excluir dado ${row.title}`,
		// 						message: `Tem certeza que deseja excluir o arquivo ${row.title}?`,
		// 						onDeleteConfirm: () => {
		// 							controller.onDeleteButtonClick(row);
		// 							sysLayoutContext.showNotification({
		// 								message: 'Excluído com sucesso!'
		// 							});
		// 						}
		// 					});
		// 				}}
		// 			/>
		// 		</Box>
		// 	)}

		// 	<SysFab
		// 		variant="extended"
		// 		text="Adicionar"
		// 		startIcon={<SysIcon name={'add'} />}
		// 		fixed={true}
		// 		onClick={controller.onAddButtonClick}
		// 	/>
		// </Container>
	);
};

export default ToDoListView;
