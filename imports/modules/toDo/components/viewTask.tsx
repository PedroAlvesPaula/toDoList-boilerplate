import React from 'react';
import { Avatar, IconButton, SxProps, Table, TableBody, Theme } from '@mui/material';
import Typography from '@mui/material/Typography';
import ViewTaskStyles from './viewTaskStyles';
import EmailIcon from '@mui/icons-material/Email';
import CakeIcon from '@mui/icons-material/Cake';
import WcIcon from '@mui/icons-material/Wc';
import BusinessIcon from '@mui/icons-material/Business';
import { IToDo } from '../api/toDoSch';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';

interface IViewTaskProps {
	closePage: () => void;
	document: IToDo;
}

export const ViewTask: React.FC<IViewTaskProps> = ({ ...props }: IViewTaskProps) => {
	const { closePage, document } = props;

	const { Container, PaperContainer, TableContainer, RowTable, CellTable } = ViewTaskStyles;

	return (
		<Container>
			<PaperContainer elevation={4}>
				<TableContainer>
					{/* <Avatar src="#" alt="Foto de perfil" sx={{ width: 100, height: 100, marginTop: '16px' }} /> */}
					<Typography variant="h5" fontWeight="bold" marginTop="16px">
						{document.title}
					</Typography>
					<Table>
						<TableBody>
							<RowTable>
								<CellTable align="left">
									<Typography variant="body1">Criada por:</Typography>
								</CellTable>
								<CellTable align="left">
									<Typography variant="body1">{document.ownerName}</Typography>
								</CellTable>
							</RowTable>

							<RowTable>
								<CellTable align="left">
									<Typography variant="body1">Descrição:</Typography>
								</CellTable>
								<CellTable align="left">
									<Typography variant="body1">{document.description}</Typography>
								</CellTable>
							</RowTable>

							<RowTable>
								<CellTable align="left">
									<Typography variant="body1">Data de criação:</Typography>
								</CellTable>
								<CellTable align="left">
									<Typography variant="body1">
										{document.createdat ? document.createdat.toLocaleString() : ''}
									</Typography>
								</CellTable>
							</RowTable>

							<RowTable>
								<CellTable align="left">
									<Typography variant="body1">Última atualização:</Typography>
								</CellTable>
								<CellTable align="left">
									<Typography variant="body1">
										{document.lastupdate ? document.lastupdate.toLocaleString() : 'Não atulizada'}
									</Typography>
								</CellTable>
							</RowTable>

							<RowTable>
								<CellTable align="left">
									<Typography variant="body1">Situação:</Typography>
								</CellTable>
								<CellTable align="left">
									<Typography variant="body1">{document.isCompleted ? 'Concluída' : 'Não concluída'}</Typography>
								</CellTable>
							</RowTable>

							<RowTable>
								<CellTable align="left">
									<Typography variant="body1">Visualização:</Typography>
								</CellTable>
								<CellTable align="left">
									<Typography variant="body1">{document.isPrivate ? 'Pessoal' : 'Pública'}</Typography>
								</CellTable>
							</RowTable>
						</TableBody>
					</Table>
				</TableContainer>
			</PaperContainer>
			<IconButton
				onClick={() => {
					closePage();
				}}
				sx={{ alignSelf: 'left', fontSize: '16px' }}>
				<SysIcon name="close" /> Fechar
			</IconButton>
		</Container>
	);
};
