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
	type: {
		type: String,
		label: 'Categoria',
		defaultValue: '',
		optional: false,
		options: () => [
			{ value: 'Categoria A', label: 'Categoria A' },
			{ value: 'Categoria B', label: 'Categoria B' },
			{ value: 'Categoria C', label: 'Categoria C' }
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
	type: string;
	isPrivate: string;
}
