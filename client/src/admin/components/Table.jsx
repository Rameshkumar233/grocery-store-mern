const Table = ({ headers, children }) => {
    return (
        <div className='max-h-screen overflow-auto custom-scrollbar'>
            <table className='w-ful border-separate border-spacing-0 text-sm text-left'>
                <thead className='text-xs uppercase bg-gray-300 sticky top-0 z-40'>
                    <tr>
                        {headers.map((h) => (
                            <th
                                key={h.label}
                                className={`px-4 py-3 whitespace-nowrap ${h.className}`}>
                                {h.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className='[&>tr>td]:border-b [&>tr>td]:border-b-gray-200 bg-white'>{children}</tbody>
            </table>
        </div>
    );
};
export default Table;
