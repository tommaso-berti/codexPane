import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

export default function Layout() {
    return (
        <div>
            <Header />
            <div>
                <Sidebar />
            </div>
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}