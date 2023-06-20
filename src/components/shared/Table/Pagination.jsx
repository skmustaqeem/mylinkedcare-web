import ReactPaginate from 'react-paginate';


const Pagination = ({ count, size, handlePageChange }) => {
  return (
      <div className="flex justify-between items-center mt-6">
          <ReactPaginate
              previousLabel="Previous"
              nextLabel="Next"
              breakLabel="..."
              breakClassName="break-me"
              pageCount={Math.ceil(count / size)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              containerClassName="pagination"
              activeClassName=""
              pageLinkClassName="block appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
          />
          <p className='text-gray-500 font-bold'>Total Records {count}</p>
      </div>
  )
}

export default Pagination