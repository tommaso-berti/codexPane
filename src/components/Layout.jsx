import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen w-full">
            <Header />
            <div className="flex flex-row flex-1 mt-20 w-full h-[calc(100dvh-5rem)] min-h-0">
                <aside className="w-72 shrink-0 border-r min-h-0 overflow-auto">
                    <Sidebar />
                </aside>
                <main
                    data-scroller="content"
                    className="flex-1 p-5 min-h-0 overflow-auto"
                >
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    )
}