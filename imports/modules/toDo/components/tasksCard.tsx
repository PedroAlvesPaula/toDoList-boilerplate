import React from 'react';
import { IToDo } from 'imports/modules/toDo/api/toDoSch';
import { Box, Divider, ListItem, ListItemAvatar, ListItemText, Tooltip, Typography } from '@mui/material';
import tasksCardStyles from './tasksCardStyles';

import AssignmentIcon from '@mui/icons-material/Assignment';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckBoxField from '/imports/ui/components/SimpleFormFields/CheckBoxField/CheckBoxField';

interface TasksCardProps {
	tasks: IToDo[];
	onDelete: (task: IToDo) => void;
	onEdit: (task: IToDo) => void;
	onChangeIsCompleted: (task: IToDo) => void;
	onTaskClick: (task: any) => void;
}

export const TasksCard: React.FC<TasksCardProps> = ({ tasks, onDelete, onEdit, onChangeIsCompleted, onTaskClick }) => {
	const { ButtonToClick } = tasksCardStyles;
	return (
		<Box sx={{ width: '95%' }}>
			{tasks.map((task, index) => (
				<React.Fragment key={task._id}>
					<ListItem alignItems="flex-start">
						<ListItemAvatar>
							<AssignmentIcon fontSize="large" sx={{ color: 'rgb(103, 104, 242)' }} />
						</ListItemAvatar>
						<CheckBoxField value={task.isCompleted} onChange={() => onChangeIsCompleted(task)} />
						<ListItemText
							onClick={() => onTaskClick(task)}
							primary={task.description}
							secondary={
								<React.Fragment>
									<Typography component={'span'} variant="body2">
										{task.ownerName || 'Sem nome'}
									</Typography>
									<br />
									<Typography component={'span'} variant="body2">
										{task.isPrivate ? 'Pessoal' : 'Pública'}
									</Typography>
								</React.Fragment>
							}
							sx={{ display: 'inline', textDecorationLine: task.isCompleted ? 'line-through' : 'none' }}
						/>

						<>
							<ButtonToClick onClick={() => onDelete && onDelete(task)}>
								<DeleteIcon />
							</ButtonToClick>
							<ButtonToClick onClick={() => onEdit && onEdit(task)} disabled={task.isCompleted}>
								<EditIcon />
							</ButtonToClick>
						</>
					</ListItem>
					<Divider variant="inset" component="li" sx={{ listStyle: 'none' }} />
				</React.Fragment>
			))}
		</Box>
	);
};
