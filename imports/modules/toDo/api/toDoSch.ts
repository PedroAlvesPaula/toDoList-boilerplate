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
			{ value: 'cadastrada', label: 'cadastrada' },
			{ value: 'em andamento', label: 'em andamento' },
			{ value: 'concluida', label: 'concluida' }
		],
		visibilityFunction(doc) {
			console.log('Dentro do state', doc);
			if (doc.state === 'create') return false;
			return true;
		}
	},
	isPrivate: {
		type: String,
		label: 'Tarefa pessoal?',
		optional: false,
		options: () => [
			{ value: 'sim', label: 'Sim' },
			{ value: 'nao', label: 'Não' }
		]
	}
};

export interface IToDo extends IDoc {
	title: string;
	description: string;
	state: string;
	isPrivate: String;
}
