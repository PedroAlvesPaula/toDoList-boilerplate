import React from 'react';
import { IToDo } from 'imports/modules/toDo/api/toDoSch';
import { Box, Divider, ListItem, ListItemAvatar, ListItemText, Menu, MenuItem, Typography } from '@mui/material';
import tasksCardStyles from './tasksCardStyles';
import CheckBoxField from '/imports/ui/components/SimpleFormFields/CheckBoxField/CheckBoxField';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import MenuIcon from '@mui/icons-material/Menu';

interface TasksCardProps {
	tasks: IToDo[];
	onDelete: (task: IToDo) => void;
	onEdit: (task: IToDo) => void;
	onChangeIsCompleted: (task: IToDo) => void;
	onTaskClick: (task: any) => void;
	handleOpenMenu: (event: React.MouseEvent<HTMLButtonElement>, taskId: string) => void;
	handleCloseMenu: (taskId: string) => void;
	anchorEl: { [key: string]: null | HTMLElement };
}

export const TasksCard: React.FC<TasksCardProps> = ({
	tasks,
	onDelete,
	onEdit,
	onChangeIsCompleted,
	onTaskClick,
	handleCloseMenu,
	handleOpenMenu,
	anchorEl = {}
}) => {
	const { ButtonToClick } = tasksCardStyles;
	return (
		<Box sx={{ width: '95%' }}>
			{tasks.map((task, index) => (
				<React.Fragment key={task._id}>
					<ListItem alignItems="center">
						<ListItemAvatar sx={{ width: '40px' }}>
							{task.isCompleted ? (
								<SysIcon fontSize="large" name="task" color="success" />
							) : (
								<SysIcon fontSize="large" name="schedule" sx={{ color: 'rgb(103, 104, 242)' }} />
							)}
						</ListItemAvatar>
						<CheckBoxField value={task.isCompleted} onChange={() => onChangeIsCompleted(task)} />
						<ListItemText
							onClick={() => onTaskClick(task)}
							primary={task.description}
							secondary={
								<React.Fragment>
									<Typography component={'span'} variant="body2">
										Criada por: {task.ownerName || ' Sem nome'}
									</Typography>
									<br />
									<Typography component={'span'} variant="body2">
										{task.isPrivate ? 'Pessoal' : 'Pública'}
									</Typography>
								</React.Fragment>
							}
							sx={{ display: 'inline', textDecorationLine: task.isCompleted ? 'line-through' : 'none' }}
						/>
						<ButtonToClick
							onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleOpenMenu(event, task._id || '')}>
							<MenuIcon />
						</ButtonToClick>

						<Menu
							anchorEl={anchorEl[task._id ?? '']}
							open={Boolean(anchorEl[task._id ?? ''])}
							onClose={() => handleCloseMenu(task._id || '')}>
							<MenuItem>
								<ButtonToClick onClick={() => onDelete(task)} sx={{ fontSize: '16px' }}>
									Deletar
									<SysIcon name="delete" sx={{ marginLeft: 1 }} />
								</ButtonToClick>
							</MenuItem>
							<MenuItem>
								<ButtonToClick
									onClick={() => {
										onEdit(task);
									}}
									disabled={task.isCompleted}
									sx={{ fontSize: '16px' }}>
									Editar
									<SysIcon name="edit" sx={{ marginLeft: 1 }} />
								</ButtonToClick>
							</MenuItem>
						</Menu>
					</ListItem>
					<Divider variant="inset" component="li" sx={{ listStyle: 'none' }} />
				</React.Fragment>
			))}
		</Box>
	);
};
