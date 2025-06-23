import React, { useCallback, useMemo } from 'react';
import ToDoListView from './toDoListView';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { ISchema } from '/imports/typings/ISchema';
import { IToDo } from '../../api/toDoSch';
import { toDoApi } from '../../api/toDoApi';
import { IMeteorError } from '/imports/typings/IMeteorError';
import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';
import { set } from 'lodash';

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
	onChangeStateButtonClick: (doc: IToDo) => void;
	onResetStateClick: (doc: Partial<IToDo>) => void;
	setConfig: React.Dispatch<React.SetStateAction<IInitialConfig>>;
	config: IInitialConfig;
}

export const ToDoListControllerContext = React.createContext<IToDoListContollerContext>(
	{} as IToDoListContollerContext
);

const initialConfig = {
	sortProperties: { field: 'createdat', sortAscending: true },
	filter: {},
	searchBy: null,
	viewComplexTable: false,
	page: 0
};

const ToDoListController = () => {
	const [config, setConfig] = React.useState<IInitialConfig>(initialConfig);

	const { title, state, isPrivate } = toDoApi.getSchema();
	const toDoSchReduzido = { title, state, isPrivate, createdat: { type: Date, label: 'Criado em' } };
	const navigate = useNavigate();

	const { sortProperties, filter } = config;
	const sort = {
		[sortProperties.field]: sortProperties.sortAscending ? 1 : -1
	};

	const { showNotification } = React.useContext(AppLayoutContext);

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

	const onAddButtonClick = useCallback(() => {
		const newDocumentId = nanoid();
		navigate(`/toDo/create/${newDocumentId}`);
	}, []);

	const onDeleteButtonClick = useCallback((row: any) => {
		toDoApi.remove(row);
	}, []);

	const onChangeStateButtonClick = useCallback((doc: IToDo) => {
		if (doc.state === 'cadastrada') doc.state = 'em andamento';
		else if (doc.state === 'em andamento') doc.state = 'concluida';

		toDoApi.update(doc, (e: IMeteorError) => {
			if (e) {
				showNotification({
					type: 'error',
					title: 'Operação não realizada!',
					message: `Erro ao realizar a operação: ${e.reason}`
				});
			} else {
				showNotification({
					type: 'success',
					title: 'Operação realizada!',
					message: 'O estágio da tarefa foi atualizado com sucesso!'
				});
			}
		});
	}, []);

	const onResetStateClick = useCallback((doc: Partial<IToDo>) => {
		doc.state = 'cadastrada';
		toDoApi.update(doc, (e: IMeteorError) => {
			if (e) {
				showNotification({
					type: 'error',
					title: 'Operação não realizada!',
					message: `Erro ao realizar a operação: ${e.reason}`
				});
			} else {
				showNotification({
					type: 'success',
					title: 'Operação realizada!',
					message: 'O tarefa foi passada para o estagio "cadastrada".'
				});
			}
		});
	}, []);

	const onChangeTextField = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		const delayedSearch = setTimeout(() => {
			setConfig((prev) => ({
				...prev,
				filter: { ...prev.filter, title: { $regex: value.trim(), $options: 'i' } }
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
					state: { $ne: null }
				}
			}));
			return;
		}
		setConfig((prev) => ({ ...prev, filter: { ...prev.filter, state: value } }));
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
			onChangeStateButtonClick: onChangeStateButtonClick,
			onResetStateClick: onResetStateClick,
			setConfig: setConfig,
			config: config
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
