import React from 'react'
import { Link, Outlet } from 'react-router'

const DashBoardLayout = () => {
  return (
    <div className='grid grid-cols-12'>
        <aside className='col-span-3'>
            <nav>
                <ul>
                    <li>
                        <Link>Home</Link>
                    </li>
                    <li>
                        <Link to={'my-cars'}>My Cars</Link>
                    </li>
                    <li>
                        <Link>Home</Link>
                    </li>
                </ul>
            </nav>
        </aside>
        <div className='col-span-9'>
            <Outlet/>
        </div>
    </div>
  )
}

export default DashBoardLayout