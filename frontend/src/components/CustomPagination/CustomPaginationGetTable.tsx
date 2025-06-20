import React, { useState } from 'react'

interface PaginationProps {
    totalPages?: number
    currentPage?: number
    totalElements?: number
    setPageNumber?: any
    setpageSize?: any
}

export const CustomPaginationGetTable: React.FC<PaginationProps> = ({
    totalPages = 0,
    currentPage = 0,
    totalElements = 0,
    setPageNumber,
    setpageSize
}) => {
    const [page, setPage] = useState(currentPage)

    const options = [
        { value: '10', label: '10' },
        { value: '20', label: '20' },
        { value: '50', label: '50' },
        { value: '100', label: '100' },
        { value: '200', label: '200' },
    ];

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setpageSize(event.target.value)
    };

    const handleClick = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage)
            setPageNumber(newPage)
        }
    }

    const getPageNumbers = (): (number | string)[] => {
        const pages: (number | string)[] = []

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i)
        } else {
            if (page <= 3) {
                pages.push(1, 2, 3, 4, 5, '...', totalPages)
            } else if (page >= totalPages - 2) {
                pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
            } else {
                pages.push(1, '...', page - 1, page, page + 1, '...', totalPages)
            }
        }

        return pages
    }

    const pages = getPageNumbers()

    const getButtonClass = (p: number | string) =>
        `flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 ${p === page
            ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700'
            : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700'
        }`

    return (
        <div className='bg-primary-10 mt-4 p-2.5'>
            <div className='flex items-center justify-between'>
                <div>Total Elements: {totalElements}</div>
                <nav aria-label="Page navigation">
                    <ul className="inline-flex -space-x-px text-sm">
                        <li>
                            <button
                                onClick={() => handleClick(page - 1)}
                                disabled={page === 1}
                                className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight ${page === 1
                                    ? 'text-gray-400 bg-gray-100'
                                    : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700'
                                    } border border-e-0 border-gray-300 rounded-s-lg`}
                            >
                                Previous
                            </button>
                        </li>

                        {pages.map((p, index) => (
                            <li key={index}>
                                {p === '...' ? (
                                    <span className="flex items-center justify-center px-3 h-8 text-gray-500 bg-white border border-gray-300">
                                        ...
                                    </span>
                                ) : (
                                    <button
                                        onClick={() => handleClick(p as number)}
                                        className={getButtonClass(p)}
                                    >
                                        {p}
                                    </button>
                                )}
                            </li>
                        ))}

                        <li>
                            <button
                                onClick={() => handleClick(page + 1)}
                                disabled={page === totalPages}
                                className={`flex items-center justify-center px-3 h-8 leading-tight ${page === totalPages
                                    ? 'text-gray-400 bg-gray-100'
                                    : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700'
                                    } border border-gray-300 rounded-e-lg`}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
                <div>
                    <select
                        id="dropdown"
                        onChange={handleChange}
                        className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-0.5 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-700"
                    >
                        <option value="" disabled>Row per page</option>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    )
}
