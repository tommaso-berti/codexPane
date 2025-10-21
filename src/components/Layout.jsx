import { useState } from 'react'
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import SettingsDrawer from './SettingsDrawer.jsx';

export default function Layout() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const openDrawer = () => setDrawerOpen(true);
    const closeDrawer = () => setDrawerOpen(false);

    return (
        <div className="flex flex-col min-h-screen w-full">
            <Header onOpenDrawer={openDrawer}/>
            <SettingsDrawer open={drawerOpen} onClose={closeDrawer} />
            <div className="flex flex-row flex-1 mt-18 w-full h-[calc(100dvh-5rem)] min-h-0">
                <div className="w-75 border-r fixed h-full">
                    <Sidebar />
                </div>
                <main
                    data-scroller="content"
                    className="flex-1 pl-5 pr-5 pt-3 min-h-0 overflow-auto ml-76 mb-6"
                >
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    )
}