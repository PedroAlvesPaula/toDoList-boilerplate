import { IDoc } from '/imports/typings/IDoc';
import { ISchema } from '/imports/typings/ISchema';

export const toDoSch: ISchema<IToDo> = {
	title: {
		type: String,
		label: 'Nome',
		defaultValue: '',
		optional: false
	},
	description: {
		type: String,
		label: 'Descrição',
		defaultValue: '',
		optional: true
	},
	state: {
		type: String,
		label: 'Estágio',
		defaultValue: '',
		optional: false,
		options: () => [
			{ value: 'Cadastrada', label: 'Cadastrada' },
			{ value: 'Em andamento', label: 'Em andamento' },
			{ value: 'Concluida', label: 'Concluída' }
		]
	},
	isPrivate: {
		type: Boolean,
		label: 'Tarefa pessoal?',
		optional: false,
		options: () => [
			{ value: true, label: 'Sim' },
			{ value: false, label: 'Não' }
		]
	}
};

export interface IToDo extends IDoc {
	title: string;
	description: string;
	state: string;
	isPrivate: boolean;
}
