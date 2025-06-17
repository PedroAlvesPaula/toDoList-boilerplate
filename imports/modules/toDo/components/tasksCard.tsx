import React from 'react';
import { IToDo } from 'imports/modules/toDo/api/toDoSch';
import { Box, Divider, ListItem, ListItemAvatar, ListItemText, Tooltip, Typography } from '@mui/material';
import tasksCardStyles from './tasksCardStyles';

import AssignmentIcon from '@mui/icons-material/Assignment';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

interface TasksCardProps {
	tasks: IToDo[];
	onDelete?: (task: IToDo) => void;
	onEdit?: (task: IToDo) => void;
	onChangeState?: (task: IToDo) => void;
	onResetState?: (task: Partial<IToDo>) => void;
}

export const TasksCard: React.FC<TasksCardProps> = ({ tasks, onDelete, onEdit, onChangeState, onResetState }) => {
	const { ButtonToClick } = tasksCardStyles;
	return (
		<Box>
			{tasks.map((task, index) => (
				<React.Fragment key={task._id}>
					<ListItem>
						<ListItemAvatar>
							<AssignmentIcon fontSize="large" sx={{ color: 'rgb(103, 104, 242)' }} />
						</ListItemAvatar>
						<ListItemText
							primary={task.title}
							secondary={
								<React.Fragment>
									<Typography component={'span'} variant="body2">
										{task.state}
									</Typography>
									<br />
									<Typography component={'span'} variant="body2">
										{task.isPrivate === 'sim' ? 'Pessoal' : 'Pública'}
									</Typography>
								</React.Fragment>
							}
						/>

						<Tooltip title="Deletar tarefa">
							<ButtonToClick onClick={() => onDelete && onDelete(task)} disabled={!onDelete}>
								<DeleteIcon />
							</ButtonToClick>
						</Tooltip>

						<Tooltip title="Editar tarefa">
							<ButtonToClick onClick={() => onEdit && onEdit(task)} disabled={!onEdit}>
								<EditIcon />
							</ButtonToClick>
						</Tooltip>

						<Tooltip title="Resetar tarefa">
							<ButtonToClick onClick={() => onResetState && onResetState(task)} disabled={!onResetState}>
								<RestartAltIcon />
							</ButtonToClick>
						</Tooltip>

						<Tooltip title="Avançar 1 estado">
							<ButtonToClick onClick={() => onChangeState && onChangeState(task)} disabled={!onChangeState}>
								<ArrowForwardIosIcon />
							</ButtonToClick>
						</Tooltip>
					</ListItem>
					<Divider variant="inset" component="li" />
				</React.Fragment>
			))}
		</Box>
	);
};
