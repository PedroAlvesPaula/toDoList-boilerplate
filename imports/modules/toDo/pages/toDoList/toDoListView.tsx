import React from 'react';
import { SysFab } from '/imports/ui/components/sysFab/sysFab';
import { ToDoListControllerContext } from './toDoListController';
import { useNavigate } from 'react-router-dom';
import ToDoListStyles from './toDoListStyles';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import { TasksCard } from '/imports/modules/toDo/components/tasksCard';
import SysTextField from '/imports/ui/components/sysFormFields/sysTextField/sysTextField';
import { SysSelectField } from '/imports/ui/components/sysFormFields/sysSelectField/sysSelectField';

const ToDoListView = () => {
	const controller = React.useContext(ToDoListControllerContext);
	const navigate = useNavigate();
	const { Container, SearchContainer } = ToDoListStyles;
	const options = [{ value: '', label: 'Nenhum' }, ...(controller.schema.state.options?.() ?? [])];

	return (
		<Container>
			<SearchContainer>
				<SysTextField
					name="search"
					placeholder="Pesquisar por nome"
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
				onEdit={(task) => navigate('/toDo/view/' + task._id)}
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
	);
};

export default ToDoListView;
