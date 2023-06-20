import { useRouter } from 'next/navigation';
import { useTable, useSortBy } from 'react-table'
import Pagination from './Pagination';

const Table = ({ columns, data, count, size, fetchList,url }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        rows,
    } = useTable({
        columns,
        data,
    }, useSortBy)

    const handlePageChange = (selectedPage) => {
        fetchList(selectedPage.selected * size)
    };
    const handleRoute = id => url ? router.push(`/${url}/${id}`)  : ""
    const router = useRouter()
    return (
        <>
            <table {...getTableProps()} className="min-w-full divide-y divide-gray-300 mt-5">
                <thead className='bg-gray-50'>
                    {headerGroups.map((headerGroup, idx) => (
                      <>
                            <tr key={idx} {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column, idx) => (
                                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3" key={idx} {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
                                        {/* <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : ''}
                                    </span> */}
                                    </th>
                                ))}
                            </tr>
                      </>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, idx) => {
                        prepareRow(row)
                        return (
                          <>
                                <tr key={idx} {...row.getRowProps()} className='even:bg-blue-100 cursor-pointer' onClick={() => handleRoute(row.original.id)}>
                                    {row.cells.map((cell) => {
                                        return <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500" key={idx} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })}
                                </tr>
                          </>
                        )
                    })}
                </tbody>
            </table>
            <Pagination size={size} count={count} handlePageChange={handlePageChange}/>
        </>
    )
}

export default Table