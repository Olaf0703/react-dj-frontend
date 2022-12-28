import { FC }          from 'react';
import * as React      from 'react';
import Paper           from '@mui/material/Paper';
import Table           from '@mui/material/Table';
import TableBody       from '@mui/material/TableBody';
import TableCell       from '@mui/material/TableCell';
import TableContainer  from '@mui/material/TableContainer';
import TableHead       from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow        from '@mui/material/TableRow';
import { BasicColor }  from 'views/Color';

interface Column {
  id: 'description' | 'type' | 'amount' ;
  label: string;
  minWidth?: number;
  align?: string;
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'description', label: 'Description', minWidth: 100},
  { id: 'type', label: 'Type', minWidth: 60 },
  {
    id: 'amount',
    label: 'Amount($)',
    align: 'right',
    minWidth: 60,
    format: (value: number) => value.toLocaleString('en-US'),
  },
];

const data = [
  {
    description: 'Block 1',
    amount: '+10',
    type: 'Shopping',
  },
  {
    description: 'Play Game',
    amount: '-100',
    type: 'Received',
  },
  {
    description: 'Block 1',
    amount: '+10',
    type: 'Save',
  },
  {
    description: 'Play Game',
    amount: '-100',
    type: 'Shopping',
  },
  {
    description: 'Block 1',
    amount: '+10',
    type: 'Received',
  },
  {
    description: 'Play Game',
    amount: '-100',
    type: 'Shopping',
  },
  {
    description: 'Block 1',
    amount: '+10',
    type: 'Shopping',
  },
  {
    description: 'Play Game',
    amount: '-100',
    type: 'Received',
  },
  {
    description: 'Block 1',
    amount: '+10',
    type: 'Save',
  },
  {
    description: 'Play Game',
    amount: '-100',
    type: 'Save',
  },
];

export const WalletTxHistory: FC = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (

      <Paper sx={{ width: '500px', overflow: 'hidden'}}>
        <TableContainer sx={{ maxHeight: 440, minHeight: 340 }}>
          <Table stickyHeader aria-label="sticky table" >
            <TableHead>
              <TableRow >
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align='center'
                    style={{ minWidth: column.minWidth, backgroundColor: BasicColor.green, color: 'white', fontSize: 18}}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, idx) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align='center' >
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            '&.MuiTablePagination-root': {
              paddingBottom: 0
            }
          }}
        />
      </Paper>
  );
}
