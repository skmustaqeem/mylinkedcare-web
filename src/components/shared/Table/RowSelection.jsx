import { useEffect } from 'react'
import { useTable, useRowSelect } from 'react-table'
import Checkbox from '../Form/Checkbox'
import Pagination from './Pagination'

export const RowSelection = ({ columns, data, count, size, getOrders, setSelectedFlatRows }) => {

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows
  } = useTable(
    {
      columns,
      data
    },
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />
        },
        ...columns
      ])
    }
  )
  useEffect(() => {
    setSelectedFlatRows(selectedFlatRows)
  }, [selectedFlatRows])

  const handlePageChange = (selectedPage) => {
    getOrders(selectedPage.selected * size)
  };
  
  return (
    <>
      <table {...getTableProps()} className="min-w-full divide-y divide-gray-300 mt-5">
        <thead className='bg-gray-50'>
          {headerGroups.map((headerGroup,idx) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={idx}>
              {headerGroup.headers.map((column,idx) => (
                <th {...column.getHeaderProps()} key={idx} className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row,idx) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} key={idx} className='even:bg-gray-50 cursor-pointer'>
                {row.cells.map((cell,idx) => {
                  return <td {...cell.getCellProps()} key={idx} className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <Pagination size={size} count={count} handlePageChange={handlePageChange} />
    </>
  )
}
