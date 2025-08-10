import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Legend } from 'recharts';

const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];
const TotalCarChart = () => {
    return (
        <div>
            <nav className="flex items-center justify-between py-4 border-b border-gray-200 mb-4">
                <h2 className="text-lg font-semibold font-rubik text-gray-800">
                    Recently Booking Car
                </h2>
            </nav>

            <div className='space-y-10'>
                <div style={{ width: '100%', height: 150  }}>
                    <h1>Total Cars</h1>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie dataKey="value" data={data} fill="#8884d8" label />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div style={{ width: '100%', height: 150  }}>
                     <h1>Total Pending</h1>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie dataKey="value" data={data} fill="#8884d8" label />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div style={{ width: '100%', height: 150 }}>
                     <h1>Total User</h1>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie dataKey="value" data={data} fill="#8884d8" label />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default TotalCarChart;
