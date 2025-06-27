import React, { useState } from 'react';
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
import { IconButton, Stack } from '@mui/material';

const ToDoListView = () => {
	const controller = React.useContext(ToDoListControllerContext);
	const navigate = useNavigate();
	const { Container, SearchContainer } = ToDoListStyles;
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
			<SearchContainer>
				<SysTextField
					name="search"
					placeholder="Pesquisar pela descrição"
					onChange={controller.onChangeTextField}
					startAdornment={<SysIcon name={'search'} />}
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
