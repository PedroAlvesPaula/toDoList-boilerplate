import React from 'react';
import { Avatar, SxProps, Table, TableBody, Theme } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import SysCardUserStyled from './sysCardUserStyles';
import { UserProfileListControllerContext } from '../../pages/UserProfileList/userProfileListController';
import SysIcon from '../../../../ui/components/sysIcon/sysIcon';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface ISysCardUserProps {
	username: string;
	roles?: string[];
	email: string;
	userId: string;
	sx?: SxProps<Theme>;
}

export const SysCardUser: React.FC<ISysCardUserProps> = ({ ...props }: ISysCardUserProps) => {
	const context = React.useContext(UserProfileListControllerContext);
	const { translateStatus, onChangeStatusClick, onEdit } = context;
	const { username, roles, email, userId, sx } = props;

	const { Container, PaperContainer, TableContainer, RowTable, CellTable } = SysCardUserStyled;

	return (
		<Container>
			<PaperContainer elevation={4}>
				<TableContainer>
					<Typography variant="h5">Teste 01</Typography>
					<Table>
						<TableBody>
							<RowTable>
								<CellTable>
									<AccountCircleIcon fontSize="large" />
								</CellTable>
								<CellTable>
									<Typography variant="body1">{username}</Typography>
								</CellTable>
							</RowTable>
							<RowTable>
								<CellTable>
									<AccountCircleIcon fontSize="large" />
								</CellTable>
								<CellTable>
									<Typography variant="body1">{email}</Typography>
								</CellTable>
							</RowTable>
							<RowTable>
								<CellTable>
									<AccountCircleIcon fontSize="large" />
								</CellTable>
								<CellTable>
									<Typography variant="body1">Status: {translateStatus(status)}</Typography>
								</CellTable>
							</RowTable>
							<RowTable>
								<CellTable sx={{ display: 'flex', justifyContent: 'space-between' }}>
									<Tooltip title="Editar usuário">
										<IconButton onClick={() => onEdit(userId)}>
											<SysIcon name="edit" />
										</IconButton>
									</Tooltip>
									<Tooltip title="Alterar status do usuário">
										<IconButton onClick={() => onChangeStatusClick(userId)}>Icone</IconButton>
									</Tooltip>
								</CellTable>
							</RowTable>
						</TableBody>
					</Table>
				</TableContainer>
			</PaperContainer>
		</Container>
	);
};
