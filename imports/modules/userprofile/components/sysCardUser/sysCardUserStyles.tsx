import React from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { PaperProps, TableCell, TableCellProps, TableRow, TableRowProps } from '@mui/material';
import Paper from '@mui/material/Paper';

interface ISysCardUserStyled {
	Container: React.ElementType<BoxProps>;
	PaperContainer: React.ElementType<PaperProps>;
	TableContainer: React.ElementType<BoxProps>;
	RowTable: React.ElementType<TableRowProps>;
	CellTable: React.ElementType<TableCellProps>;
}

const SysCardUserStyled: ISysCardUserStyled = {
	Container: styled(Box)(({ theme }) => ({
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		marginTop: '32px'
	})),

	PaperContainer: styled(Paper)(({ theme }) => ({
		minWidth: 450,
		margin: 'auto',
		m: 4,
		p: 3,
		borderRadius: 3,
		[theme.breakpoints.down('sm')]: {
			minWidth: '90%'
		}
	})),
	TableContainer: styled(Box)(({ theme }) => ({
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		gap: 2
	})),
	RowTable: styled(TableRow)(({ theme }) => ({
		width: '100%',
		justifyContent: 'space-around'
	})),
	CellTable: styled(TableCell)(({ theme }) => ({
		width: '100%'
	}))
};

export default SysCardUserStyled;
