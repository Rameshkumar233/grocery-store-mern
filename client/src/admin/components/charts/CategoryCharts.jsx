import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#3B82F6", "#22C55E", "#F97316", "#A855F7", "#EF4444"];

export default function CategoryChart({ data }) {
    return (
        <div className='bg-white rounded-2xl border border-gray-300 shadow-sm p-5'>
            <h2 className='font-semibold text-gray-800 mb-4'>Products by Category</h2>

            <div className='w-full h-75 min-h-80'>
                <ResponsiveContainer
                    width='100%'
                    height='100%'>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey='count'
                            nameKey='name'
                            outerRadius={100}
                            innerRadius={50}>
                            {data.map((_, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index]}
                                />
                            ))}
                        </Pie>

                        <Tooltip wrapperStyle={{ backgroundColor: "#cccfff" }} />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className='flex flex-wrap gap-3 mt-4'>
                {data.map((item, i) => (
                    <div
                        key={i}
                        className='flex items-center gap-2 text-sm'>
                        <span
                            className='w-3 h-3 rounded-full'
                            style={{ background: COLORS[i % COLORS.length] }}
                        />
                        {item.name} ({item.count})
                    </div>
                ))}
            </div>
        </div>
    );
}
