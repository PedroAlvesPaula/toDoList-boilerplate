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
		type: Boolean,
		label: 'Estágio',
		defaultValue: false,
		optional: false,
		options: () => [
			{ value: false, label: 'Não concluída' },
			{ value: true, label: 'Concluída' }
		]
	},
	isPrivate: {
		type: Boolean,
		label: 'Tarefa pessoal?',
		optional: false,
		defaultValue: true,
		options: () => [
			{ value: true, label: 'Sim' },
			{ value: false, label: 'Não' }
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
	isCompleted: boolean;
	isPrivate: boolean;
	ownerId: string;
	ownerName: string;
}
