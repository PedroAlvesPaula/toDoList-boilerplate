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
		height: '100vh',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	})),

	PaperContainer: styled(Paper)(({ theme }) => ({
		maxWidth: 500,
		minWidth: 320,
		margin: 'auto',
		m: 4,
		p: 3,
		borderRadius: 3,
		backgroundColor: 'red'
	})),
	TableContainer: styled(Box)(({ theme }) => ({
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		gap: 2
	})),
	RowTable: styled(TableRow)(({ theme }) => ({
		width: '100%'
	})),
	CellTable: styled(TableCell)(({ theme }) => ({
		alignItems: 'center',
		width: '100%'
	}))
};

export default SysCardUserStyled;
