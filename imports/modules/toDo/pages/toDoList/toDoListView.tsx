import React from 'react';
import { SysFab } from '/imports/ui/components/sysFab/sysFab';
import { ToDoListControllerContext } from './toDoListController';
import { useNavigate } from 'react-router-dom';
import ToDoListStyles from './toDoListStyles';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import { TasksCard } from '/imports/modules/toDo/components/tasksCard';
import SysTextField from '/imports/ui/components/sysFormFields/sysTextField/sysTextField';
import { SysSelectField } from '/imports/ui/components/sysFormFields/sysSelectField/sysSelectField';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { IconButton, Stack, Tooltip } from '@mui/material';

const ToDoListView = () => {
	const controller = React.useContext(ToDoListControllerContext);
	const navigate = useNavigate();
	const { Container, SearchContainer } = ToDoListStyles;
	const options = [{ value: '', label: 'Nenhum' }, ...(controller.schema.isCompleted.options?.() ?? [])];

	return (
		<Container>
			<SearchContainer>
				<SysTextField
					name="search"
					placeholder="Pesquisar pela descrição"
					onChange={controller.onChangeTextField}
					startAdornment={<SysIcon name={'search'} />}
				/>
				<SysSelectField
					name="Category"
					label="Estágio"
					options={options}
					placeholder="Selecionar"
					onChange={controller.onChangeCategory}
				/>
			</SearchContainer>
			<TasksCard
				tasks={controller.todoList}
				onDelete={controller.onDeleteButtonClick}
				onEdit={(task) => navigate('/toDo/edit/' + task._id)}
				onChangeIsCompleted={controller.onChangeIsCompletedButtonClick}
				onTaskClick={controller.onTaskClick ?? (() => {})}
			/>
			<SysFab
				variant="extended"
				text="Adicionar"
				startIcon={<SysIcon name={'add'} />}
				fixed={true}
				onClick={controller.onAddButtonClick}
			/>
			<Stack
				direction="row"
				spacing={2}
				justifyContent="center"
				alignItems="center"
				mt={2}
				sx={{ width: '90%', justifyContent: 'space-between' }}>
				<IconButton
					onClick={() =>
						controller.setConfig((prev) => ({
							...prev,
							page: Math.max(0, prev.page - 1)
						}))
					}
					disabled={controller.config.page === 0}
					sx={{ fontSize: '16px' }}>
					<NavigateBeforeIcon fontSize="large" /> Anterior
				</IconButton>
				<IconButton
					onClick={() =>
						controller.setConfig((prev) => ({
							...prev,
							page: prev.page + 1
						}))
					}
					disabled={controller.todoList.length < 4}
					sx={{ fontSize: '16px' }}>
					Próxima <NavigateNextIcon fontSize="large" />
				</IconButton>
			</Stack>
		</Container>
	);
};

export default ToDoListView;
