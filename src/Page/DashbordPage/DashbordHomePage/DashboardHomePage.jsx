import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../../ContextApi/UserContext/UserContext'
import UseAuth from '../../../Hook/useAuth/useAuth'
import { totalCar, totalUser } from '../../../Hook/dashboardApi/dashbordApi'

const DashboardHomePage = () => {
    const { user } = UseAuth()
    const [totalCars, setTotalCar] = useState(0);
    const [totalUsers, setTotalUser] = useState(0);
    useEffect(() => {
        const fetchTotal = async () => {
             
            const [total,totalUsers] = await Promise.all([totalCar(),totalUser()])
            setTotalCar(total);
            setTotalUser(totalUsers)
        };
        fetchTotal();
    }, []);

    return (
        <div>
            <div className="stats shadow">

                {
                    user.role == 'admin' && (<div className="stat">
                        <div className="stat-figure text-primary">

                        </div>
                        <div className="stat-title">Total Cars</div>
                        <div className="stat-value text-primary">{totalCars }</div>

                    </div>)
                }
                
                {
                    user.role == 'admin' && (<div className="stat">
                        <div className="stat-figure text-primary">

                        </div>
                        <div className="stat-title">Total User</div>
                        <div className="stat-value text-primary">{totalUsers }</div>

                    </div>)
                }

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-8 w-8 stroke-current"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                            ></path>
                        </svg>
                    </div>
                    <div className="stat-title">Page Views</div>
                    <div className="stat-value text-secondary">2.6M</div>
                    <div className="stat-desc">21% more than last month</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <div className="avatar avatar-online">
                            <div className="w-16 rounded-full">
                                <img src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp" />
                            </div>
                        </div>
                    </div>
                    <div className="stat-value">86%</div>
                    <div className="stat-title">Tasks done</div>
                    <div className="stat-desc text-secondary">31 tasks remaining</div>
                </div>
            </div>
        </div>
    )
}

export default DashboardHomePage