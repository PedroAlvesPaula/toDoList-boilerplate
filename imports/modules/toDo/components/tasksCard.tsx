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
		<Box sx={{ width: '95%' }}>
			{tasks.map((task, index) => (
				<React.Fragment key={task._id}>
					<ListItem alignItems="flex-start">
						<ListItemAvatar>
							<AssignmentIcon fontSize="large" sx={{ color: 'rgb(103, 104, 242)' }} />
						</ListItemAvatar>
						<ListItemText
							primary={task.title}
							secondary={
								<React.Fragment>
									<Typography component={'span'} variant="body2">
										{task.owner}
									</Typography>
									<br />
									<Typography component={'span'} variant="body2">
										{task.isPrivate === 'sim' ? 'Pessoal' : 'Pública'}
									</Typography>
								</React.Fragment>
							}
							sx={{ display: 'inline' }}
						/>

						<>
							<Tooltip title="Deletar tarefa">
								<ButtonToClick onClick={() => onDelete && onDelete(task)}>
									<DeleteIcon />
								</ButtonToClick>
							</Tooltip>

							<Tooltip title="Editar tarefa">
								<ButtonToClick onClick={() => onEdit && onEdit(task)}>
									<EditIcon />
								</ButtonToClick>
							</Tooltip>

							<Tooltip title="Resetar tarefa">
								<span>
									<ButtonToClick
										onClick={() => onResetState && onResetState(task)}
										disabled={task.state === 'cadastrada' ? true : false}>
										<RestartAltIcon />
									</ButtonToClick>
								</span>
							</Tooltip>

							<Tooltip title="Avançar 1 estado">
								<span>
									<ButtonToClick
										onClick={() => onChangeState && onChangeState(task)}
										disabled={task.state === 'concluida' ? true : false}>
										<ArrowForwardIosIcon />
									</ButtonToClick>
								</span>
							</Tooltip>
						</>
					</ListItem>
					<Divider variant="inset" component="li" sx={{ listStyle: 'none' }} />
				</React.Fragment>
			))}
		</Box>
	);
};
