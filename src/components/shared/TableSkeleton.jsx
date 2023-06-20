
const TableSkeleton = () => {
    return (
        <div className="flex animate-pulse">
            <div className="w-full">
                <ul className="grid grid-cols-3 items-center mt-12">
                    <li className="w-full h-8 bg-gray-200 rounded-md dark:bg-gray-300"></li>
                    <li className="w-full h-8 bg-gray-200 rounded-md dark:bg-gray-300"></li>
                    <li className="w-full h-8 bg-gray-200 rounded-md dark:bg-gray-300"></li>
                </ul>
                <ul className="mt-12">
                    <li className="w-full h-12 bg-gray-200 rounded-md dark:bg-gray-300 mb-5"></li>
                    <li className="w-full h-12 bg-gray-200 rounded-md dark:bg-gray-300 mb-5"></li>
                    <li className="w-full h-12 bg-gray-200 rounded-md dark:bg-gray-300 mb-5"></li>
                    <li className="w-full h-12 bg-gray-200 rounded-md dark:bg-gray-300 mb-5"></li>
                    <li className="w-full h-12 bg-gray-200 rounded-md dark:bg-gray-300 mb-5"></li>
                    <li className="w-full h-12 bg-gray-200 rounded-md dark:bg-gray-300 mb-5"></li>
                    <li className="w-full h-12 bg-gray-200 rounded-md dark:bg-gray-300 mb-5"></li>
                    <li className="w-full h-12 bg-gray-200 rounded-md dark:bg-gray-300 mb-5"></li>
                    <li className="w-full h-12 bg-gray-200 rounded-md dark:bg-gray-300 mb-5"></li>
                    <li className="w-full h-12 bg-gray-200 rounded-md dark:bg-gray-300 mb-5"></li>
                </ul>
            </div>
        </div>
    )
}

export default TableSkeleton