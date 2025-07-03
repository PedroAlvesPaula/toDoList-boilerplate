import React, { useState } from 'react';
import { SysFab } from '/imports/ui/components/sysFab/sysFab';
import { ToDoListControllerContext } from './toDoListController';
import { useNavigate } from 'react-router-dom';
import ToDoListStyles from './toDoListStyles';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import { TasksCard } from '/imports/modules/toDo/components/tasksCard';
import SysTextField from '/imports/ui/components/sysFormFields/sysTextField/sysTextField';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { IconButton, Stack, Switch, Typography } from '@mui/material';

const ToDoListView = () => {
	const controller = React.useContext(ToDoListControllerContext);
	const navigate = useNavigate();
	const { Container, SearchContainer, ContainerSwitch, NavigateButtonsContainer, ButtonsNavigate } = ToDoListStyles;
	const options = [{ value: '', label: 'Nenhum' }, ...(controller.schema.isCompleted.options?.() ?? [])];

	const [anchorEl, setAnchorEl] = useState<{ [key: string]: null | HTMLElement }>({});

	const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>, taskId: string) => {
		setAnchorEl({ ...anchorEl, [taskId]: event.currentTarget });
	};

	const handleCloseMenu = (taskId: string) => {
		const active = document.activeElement as HTMLElement | null;
		if (active) active.blur();
		setAnchorEl({ ...anchorEl, [taskId]: null });
	};

	return (
		<Container>
			<NavigateButtonsContainer>
				<ButtonsNavigate
					variant={controller.config.showPersonalTasks ? 'contained' : 'outlined'}
					sx={{ borderRadius: '8px 0 0 8px' }}
					onClick={() =>
						controller.setConfig((prev) => ({
							...prev,
							showPersonalTasks: true
						}))
					}>
					Minhas tarefas
				</ButtonsNavigate>
				<ButtonsNavigate
					variant={!controller.config.showPersonalTasks ? 'contained' : 'outlined'}
					sx={{ borderRadius: '0 8px 8px 0' }}
					onClick={() =>
						controller.setConfig((prev) => ({
							...prev,
							showPersonalTasks: false
						}))
					}>
					Tarefas do time
				</ButtonsNavigate>
			</NavigateButtonsContainer>
			<SearchContainer>
				<ContainerSwitch>
					<Typography component="p">
						{controller.config.hideCompletedTasks ? 'Tarefas pendentes' : 'Tarefas concluídas'}
					</Typography>
					<Switch
						name="hideCompletedTasks"
						value={controller.config.hideCompletedTasks}
						onChange={(e) =>
							controller.setConfig((prev) => ({
								...prev,
								hideCompletedTasks: e.target.checked
							}))
						}
					/>
				</ContainerSwitch>
				<SysTextField
					name="search"
					placeholder="Pesquisar tarefas pela descrição"
					onChange={controller.onChangeTextField}
					startAdornment={<SysIcon name={'search'} />}
					sxMap={{
						textField: { '& .MuiInputBase-root': { backgroundColor: (theme) => theme.palette.secondary.light } }
					}}
				/>
			</SearchContainer>
			<TasksCard
				tasks={controller.todoList}
				onDelete={controller.onDeleteButtonClick}
				onEdit={controller.onEditButtonClick}
				onChangeIsCompleted={controller.onChangeIsCompletedButtonClick}
				onTaskClick={controller.onTaskClick ?? (() => {})}
				handleCloseMenu={handleCloseMenu}
				handleOpenMenu={handleOpenMenu}
				anchorEl={anchorEl}
				hideMenu={false}
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
			<SysFab
				variant="extended"
				text="Adicionar"
				startIcon={<SysIcon name={'add'} />}
				onClick={controller.onAddButtonClick}
			/>
		</Container>
	);
};

export default ToDoListView;
