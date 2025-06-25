import React from 'react';
import viewTaskStyles from './viewTaskStyles';
import { IconButton } from '@mui/material';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import SysForm from '/imports/ui/components/sysForm/sysForm';
import SysTextField from '/imports/ui/components/sysFormFields/sysTextField/sysTextField';
import { SysRadioButton } from '/imports/ui/components/sysFormFields/sysRadioButton/sysRadioButton';
import SysFormButton from '/imports/ui/components/sysFormFields/sysFormButton/sysFormButton';
import { SysSelectField } from '/imports/ui/components/sysFormFields/sysSelectField/sysSelectField';
import { ISchema } from '/imports/typings/ISchema';
import { IToDo } from '../api/toDoSch';

interface ViewTaskProps {
	closePage: () => void;
	document: IToDo;
	loading: boolean;
	schema: ISchema<IToDo>;
}

const ViewTask: React.FC<ViewTaskProps> = ({ closePage, schema, document, loading }) => {
	const { Container, Body, Header, Footer, FormColumn } = viewTaskStyles;

	console.log('Document', document);

	return (
		<Container>
			<Body>
				<Header>
					<IconButton onClick={closePage}>
						<SysIcon name={'arrowBack'} />
					</IconButton>
					<IconButton onClick={closePage}>
						<SysIcon name={'close'} />
					</IconButton>
				</Header>
				<SysForm mode={'view'} schema={schema} doc={document} loading={loading}>
					<FormColumn>
						<SysTextField name="title" placeholder="Ex.: Item XX" />
						<SysSelectField name="isCompleted" placeholder="Selecionar" />
						<SysTextField
							name="description"
							placeholder="Acrescente informações sobre o item (3 linhas)"
							multiline
							rows={3}
							showNumberCharactersTyped
							max={200}
						/>
						<SysRadioButton name="isPrivate" childrenAlignment="row" size="small" />
					</FormColumn>
				</SysForm>
			</Body>
		</Container>
	);
};

export default ViewTask;
