import React from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { PaperProps, TableCell, TableCellProps, TableRow, TableRowProps } from '@mui/material';
import Paper from '@mui/material/Paper';

interface IViewTaskStyles {
	Container: React.ElementType<BoxProps>;
	PaperContainer: React.ElementType<PaperProps>;
	TableContainer: React.ElementType<BoxProps>;
	RowTable: React.ElementType<TableRowProps>;
	CellTable: React.ElementType<TableCellProps>;
}

const ViewTaskStyles: IViewTaskStyles = {
	Container: styled(Box)(({ theme }) => ({
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		margin: '32px 0 32px 0'
	})),

	PaperContainer: styled(Paper)(({ theme }) => ({
		minWidth: 450,
		margin: 'auto',
		m: 4,
		p: 3,
		borderRadius: 3,
		[theme.breakpoints.down('sm')]: {
			minWidth: '90%'
		},
		boxShadow: 'none',
		border: 'none'
	})),
	TableContainer: styled(Box)(({ theme }) => ({
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		gap: 2
	})),
	RowTable: styled(TableRow)(({ theme }) => ({
		width: '100%',
		justifyContent: 'space-between'
	})),
	CellTable: styled(TableCell)(({ theme }) => ({}))
};

export default ViewTaskStyles;
