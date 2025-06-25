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
		optional: false
	},
	isCompleted: {
		type: String,
		label: 'Estágio',
		defaultValue: 'Não concluída',
		optional: false,
		options: () => [
			{ value: 'Não concluída', label: 'Não concluída' },
			{ value: 'Concluída', label: 'Concluída' }
		]
	},
	isPrivate: {
		type: String,
		label: 'Tarefa pessoal?',
		optional: false,
		options: () => [
			{ value: 'sim', label: 'Sim' },
			{ value: 'nao', label: 'Não' }
		]
	},
	ownerId: {
		type: String,
		optional: true
	}
};

export interface IToDo extends IDoc {
	title: string;
	description: string;
	isCompleted: string;
	isPrivate: string;
	ownerId: string;
	ownerName: string;
}
