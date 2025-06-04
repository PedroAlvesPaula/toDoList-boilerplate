import React, { createContext, useCallback, useContext } from 'react';
import ToDoDetailView from './toDoDetailView';
import { useNavigate } from 'react-router-dom';
import { ToDoModuleContext } from '../../toDoContainer';
import { useTracker } from 'meteor/react-meteor-data';
import { toDoApi } from '../../api/toDoApi';
import { IToDo } from '../../api/toDoSch';
import { ISchema } from '/imports/typings/ISchema';
import { IMeteorError } from '/imports/typings/BoilerplateDefaultTypings';
import { SysAppLayoutContext } from '/imports/app/appLayout';

interface IToDoDetailContollerContext {
	closePage: () => void;
	document: IToDo;
	loading: boolean;
	schema: ISchema<IToDo>;
	onSubmit: (doc: IToDo) => void;
	changeToEdit: (id: string) => void;
}

export const ToDoDetailControllerContext = createContext<IToDoDetailContollerContext>(
	{} as IToDoDetailContollerContext
);

const ToDoDetailController = () => {
	const navigate = useNavigate();
	const { id, state } = useContext(ToDoModuleContext);
	const { showNotification } = useContext(SysAppLayoutContext);

	const { document, loading } = useTracker(() => {
		const subHandle = !!id ? toDoApi.subscribe('toDoDetail', { _id: id }) : null;
		const document = id && subHandle?.ready() ? toDoApi.findOne({ _id: id }) : {};
		return {
			document: (document as IToDo) ?? ({ _id: id } as IToDo),
			loading: !!subHandle && !subHandle?.ready()
		};
	}, [id]);

	const closePage = useCallback(() => {
		navigate(-1);
	}, []);
	const changeToEdit = useCallback((id: string) => {
		navigate(`/toDo/edit/${id}`);
	}, []);

	const onSubmit = useCallback((doc: IToDo) => {
		const selectedAction = state === 'create' ? 'insert' : 'update';
		toDoApi[selectedAction](doc, (e: IMeteorError) => {
			if (!e) {
				closePage();
				showNotification({
					type: 'success',
					title: 'Operação realizada!',
					message: `O exemplo foi ${selectedAction === 'update' ? 'atualizado' : 'cadastrado'} com sucesso!`
				});
			} else {
				showNotification({
					type: 'error',
					title: 'Operação não realizada!',
					message: `Erro ao realizar a operação: ${e.reason}`
				});
			}
		});
	}, []);

	return (
		<ToDoDetailControllerContext.Provider
			value={{
				closePage,
				document: { ...document, _id: id },
				loading,
				schema: toDoApi.getSchema(),
				onSubmit,
				changeToEdit
			}}>
			{<ToDoDetailView />}
		</ToDoDetailControllerContext.Provider>
	);
};

export default ToDoDetailController;
