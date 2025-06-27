import React, { useCallback, useContext, useMemo } from 'react';
import ToDoListView from './toDoListView';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { ISchema } from '/imports/typings/ISchema';
import { IToDo } from '../../api/toDoSch';
import { toDoApi } from '../../api/toDoApi';
import { IMeteorError } from '/imports/typings/IMeteorError';
import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';
import AuthContext from '/imports/app/authProvider/authContext';

interface IInitialConfig {
	sortProperties: { field: string; sortAscending: boolean };
	filter: Object;
	searchBy: string | null;
	viewComplexTable: boolean;
	page: number;
	limit?: number;
}

interface IToDoListContollerContext {
	onAddButtonClick: () => void;
	onDeleteButtonClick: (row: any) => void;
	todoList: IToDo[];
	schema: ISchema<any>;
	loading: boolean;
	onChangeTextField: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onChangeCategory: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onChangeIsCompletedButtonClick: (doc: IToDo) => void;
	setConfig: React.Dispatch<React.SetStateAction<IInitialConfig>>;
	config: IInitialConfig;
	onTaskClick?: (task: any) => void;
	onEditButtonClick: (task: IToDo) => void;
}

export const ToDoListControllerContext = React.createContext<IToDoListContollerContext>(
	{} as IToDoListContollerContext
);

const initialConfig = {
	sortProperties: { field: 'createdat', sortAscending: false },
	filter: {},
	searchBy: null,
	viewComplexTable: false,
	page: 0
};

const ToDoListController = () => {
	const [config, setConfig] = React.useState<IInitialConfig>(initialConfig);

	const { title, isCompleted, isPrivate } = toDoApi.getSchema();
	const toDoSchReduzido = { title, isCompleted, isPrivate, createdat: { type: Date, label: 'Criado em' } };
	const navigate = useNavigate();

	const { user } = useContext(AuthContext);

	const { sortProperties, filter } = config;
	const sort = {
		[sortProperties.field]: sortProperties.sortAscending ? 1 : -1
	};

	const { showNotification, showModal, closeModal } = React.useContext(AppLayoutContext);

	const { loading, toDos } = useTracker(() => {
		const subHandle =
			toDoApi.subscribe('toDoList', filter, {
				sort: sort,
				page: config.page
			}) ?? null;

		const toDos = subHandle?.ready() ? toDoApi.find(filter, { sort }).fetch() : [];

		return {
			toDos,
			loading: !!subHandle && !subHandle.ready(),
			total: subHandle ? subHandle.total : toDos.length
		};
	}, [config]);

	const sx = {
		width: {
			xs: '90%',
			sm: '90%'
			// md: '60%',
			// lg: '60%'
		},
		maxWidth: '600px',
		maxHeight: '800px',
		overflowY: 'auto',
		borderRadius: '10px',
		position: 'fixed',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		display: 'flex',
		flexDirection: 'column',
		margin: 0
	};

	const onAddButtonClick = useCallback(() => {
		const newDocumentId = nanoid();
		showModal({
			title: 'Editar grupo de sensores',
			urlPath: `/toDo/create/${newDocumentId}`,
			sx: sx,
			onClose: () => closeModal()
		});
	}, []);

	const onTaskClick = useCallback((task: any) => {
		showModal({
			title: 'Editar grupo de sensores',
			urlPath: '/toDo/view/' + task._id,
			sx: sx,
			onClose: () => closeModal()
		});
	}, []);

	const onEditButtonClick = useCallback((task: IToDo) => {
		showModal({
			title: 'Editar grupo de sensores',
			urlPath: `/toDo/edit/${task._id}`,
			sx: sx,
			onClose: () => closeModal()
		});
	}, []);

	const onDeleteButtonClick = useCallback((row: any) => {
		if (row.ownerId === user?._id) toDoApi.remove(row);
		else {
			showNotification({
				type: 'error',
				title: 'Não é possível excluir a tarefa!',
				message: 'Somente quem criou a tarefa consergue excluíla!',
				sxMap: { container: { width: { xs: '90%', sm: '90%' }, minWidth: '300px' } }
			});
		}
	}, []);

	const onChangeIsCompletedButtonClick = useCallback((doc: IToDo) => {
		if (!doc.isCompleted) doc.isCompleted = true;
		else doc.isCompleted = false;

		toDoApi.update(doc, (e: IMeteorError) => {
			if (e) {
				showNotification({
					type: 'error',
					title: 'Operação não realizada!',
					message: `Erro ao realizar a operação: ${e.reason}`,
					sxMap: { container: { width: { xs: '90%', sm: '90%' }, minWidth: '300px' } }
				});
			} else {
				showNotification({
					type: 'success',
					title: 'Operação realizada!',
					message: 'O estágio da tarefa foi atualizado com sucesso!',
					sxMap: { container: { width: { xs: '90%', sm: '90%' }, minWidth: '300px' } }
				});
			}
		});
	}, []);

	const onChangeTextField = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		const delayedSearch = setTimeout(() => {
			setConfig((prev) => ({
				...prev,
				filter: { ...prev.filter, description: { $regex: value.trim(), $options: 'i' } }
			}));
		}, 1000);
		return () => clearTimeout(delayedSearch);
	}, []);

	const onSelectedCategory = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		if (!value) {
			setConfig((prev) => ({
				...prev,
				filter: {
					...prev.filter,
					isCompleted: { $ne: null }
				}
			}));
			return;
		}
		setConfig((prev) => ({ ...prev, filter: { ...prev.filter, isCompleted: value } }));
	}, []);

	const providerValues: IToDoListContollerContext = useMemo(
		() => ({
			onAddButtonClick,
			onDeleteButtonClick,
			todoList: toDos,
			schema: toDoSchReduzido,
			loading,
			onChangeTextField,
			onChangeCategory: onSelectedCategory,
			onChangeIsCompletedButtonClick: onChangeIsCompletedButtonClick,
			setConfig: setConfig,
			config: config,
			onTaskClick: onTaskClick,
			onEditButtonClick: onEditButtonClick
		}),
		[toDos, loading]
	);

	return (
		<ToDoListControllerContext.Provider value={providerValues}>
			<ToDoListView />
		</ToDoListControllerContext.Provider>
	);
};

export default ToDoListController;
