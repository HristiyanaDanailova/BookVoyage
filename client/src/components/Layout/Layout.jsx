import { Outlet } from 'react-router-dom'

import './Layout.css'

import Header from '../Header/Header'

const Layout = () => {
    return (
        <div className='d-flex flex-column min-vh-100 w-100'>
            <Header />
            <div className="p-4">
                <Outlet />
            </div>
        </div>

    )
}

export default Layout