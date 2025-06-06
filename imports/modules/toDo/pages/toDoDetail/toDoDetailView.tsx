import React, { useContext } from 'react';
import { ToDoDetailControllerContext } from './toDoDetailContoller';
import { ToDoModuleContext } from '../../toDoContainer';
import ToDoDetailStyles from './toDoDetailStyles';
import SysForm from '/imports/ui/components/sysForm/sysForm';
import SysTextField from '/imports/ui/components/sysFormFields/sysTextField/sysTextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { SysSelectField } from '/imports/ui/components/sysFormFields/sysSelectField/sysSelectField';
import { SysRadioButton } from '/imports/ui/components/sysFormFields/sysRadioButton/sysRadioButton';
import SysFormButton from '/imports/ui/components/sysFormFields/sysFormButton/sysFormButton';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';

const ToDoDetailView = () => {
	const controller = useContext(ToDoDetailControllerContext);
	const { state } = useContext(ToDoModuleContext);
	const isView = state === 'view';
	const isEdit = state === 'edit';
	const isCreate = state === 'create';
	const { Container, Body, Header, Footer, FormColumn } = ToDoDetailStyles;

	return (
		<Container>
			<Body>
				<Header>
					{isView && (
						<IconButton onClick={controller.closePage}>
							<SysIcon name={'arrowBack'} />
						</IconButton>
					)}
					<Typography variant="h5" sx={{ flexGrow: 1 }}>
						{isCreate ? 'Adicionar tarefa' : isEdit ? 'Editar tarefa' : controller.document.title}
					</Typography>
					<IconButton
						onClick={!isView ? controller.closePage : () => controller.changeToEdit(controller.document._id || '')}>
						{!isView ? <SysIcon name={'close'} /> : <SysIcon name={'edit'} />}
					</IconButton>
				</Header>
				<SysForm
					mode={state as 'create' | 'view' | 'edit'}
					schema={
						state === 'edit'
							? controller.schema
							: {
									...controller.schema,
									state: {
										type: String,
										label: 'Estágio',
										defaultValue: 'cadastrada',
										readOnly: true,
										optional: false,
										options: () => [
											{ value: 'cadastrada', label: 'cadastrada' },
											{ value: 'em andamento', label: 'em andamento' },
											{ value: 'concluida', label: 'concluida' }
										]
									}
								}
					}
					doc={controller.document}
					onSubmit={controller.onSubmit}
					loading={controller.loading}>
					<FormColumn>
						<SysTextField name="title" placeholder="Ex.: Item XX" />
						<SysSelectField name="state" placeholder="Selecionar" />
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
					<Footer>
						{!isView && (
							<Button variant="outlined" startIcon={<SysIcon name={'close'} />} onClick={controller.closePage}>
								Cancelar
							</Button>
						)}
						<SysFormButton>Salvar</SysFormButton>
					</Footer>
				</SysForm>
			</Body>
		</Container>
	);
};

export default ToDoDetailView;
