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
import ViewTask from '../../components/viewTask';

const ToDoDetailView = () => {
	const controller = useContext(ToDoDetailControllerContext);
	const { state } = useContext(ToDoModuleContext);
	const isView = state === 'view';
	const isEdit = state === 'edit';
	const isCreate = state === 'create';
	const { Container, Body, Header, Footer, FormColumn } = ToDoDetailStyles;

	return (
		<>
			{isView ? (
				<ViewTask
					closePage={controller.closePage}
					schema={controller.schema}
					document={controller.document}
					loading={controller.loading}
				/>
			) : (
				<Container>
					<Body>
						<Header>
							<Typography variant="h5" sx={{ flexGrow: 1 }}>
								{isCreate ? 'Adicionar tarefa' : isEdit ? 'Editar tarefa' : controller.document.title}
							</Typography>
							<IconButton onClick={() => controller.changeToEdit(controller.document._id || '')}>
								<SysIcon name={'edit'} />
							</IconButton>
						</Header>
						<SysForm
							mode={state as 'create' | 'edit'}
							schema={
								isEdit
									? controller.schema
									: {
											...controller.schema,
											isCompleted: {
												type: Boolean,
												label: 'Tarefa concluída?',
												defaultValue: false,
												readOnly: true,
												optional: false,
												options: () => [
													{ value: false, label: 'Não concluída' },
													{ value: true, label: 'Concluída' }
												]
											}
										}
							}
							doc={controller.document}
							onSubmit={controller.onSubmit}
							loading={controller.loading}>
							<FormColumn>
								<SysTextField name="title" placeholder="Ex.: Item XX" />
								<SysSelectField name="isCompleted" placeholder="Selecionar" />
								<SysTextField
									name="description"
									placeholder="Acrescente informações sobre o item (3 linhas)"
									multiline
									showNumberCharactersTyped
									rows={3}
									max={200}
								/>
								<SysRadioButton name="isPrivate" childrenAlignment="row" size="small" />
							</FormColumn>
							<Footer>
								<Button variant="outlined" startIcon={<SysIcon name={'close'} />} onClick={controller.closePage}>
									Cancelar
								</Button>
								<SysFormButton>Salvar</SysFormButton>
							</Footer>
						</SysForm>
					</Body>
				</Container>
			)}
		</>
	);
};

export default ToDoDetailView;
