import React from 'react';
import { Avatar, SxProps, Table, TableBody, Theme } from '@mui/material';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import SysCardUserStyled from './sysCardUserStyles';
import { UserProfileListControllerContext } from '../../pages/UserProfileList/userProfileListController';
import SysIcon from '../../../../ui/components/sysIcon/sysIcon';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import CakeIcon from '@mui/icons-material/Cake';
import WcIcon from '@mui/icons-material/Wc';
import BusinessIcon from '@mui/icons-material/Business';

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
					<Avatar src="#" alt="Foto de perfil" sx={{ width: 100, height: 100, marginTop: '16px' }} />
					<Typography variant="h5" fontWeight="bold" marginTop="16px">
						Username
					</Typography>
					<Table>
						<TableBody>
							<RowTable>
								<CellTable>
									<EmailIcon fontSize="large" />
								</CellTable>
								<CellTable>
									<Typography variant="body1">{email}</Typography>
								</CellTable>
							</RowTable>

							<RowTable>
								<CellTable>
									<CakeIcon fontSize="large" />
								</CellTable>
								<CellTable>
									<Typography variant="body1">Aniversario</Typography>
								</CellTable>
							</RowTable>

							<RowTable>
								<CellTable>
									<WcIcon fontSize="large" />
								</CellTable>
								<CellTable>
									<Typography variant="body1">Gender</Typography>
								</CellTable>
							</RowTable>

							<RowTable>
								<CellTable>
									<BusinessIcon fontSize="large" />
								</CellTable>
								<CellTable>
									<Typography variant="body1">Empresa</Typography>
								</CellTable>
							</RowTable>
						</TableBody>
					</Table>
				</TableContainer>
			</PaperContainer>
		</Container>
	);
};
