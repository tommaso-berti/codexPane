import SectMenu from './SectMenu.jsx';
import Footer from './Footer';

export default function Sidebar() {
    return (
        <aside className="h-[calc(100vh-71px)] flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto">
                <SectMenu />
            </div>
            <Footer />
        </aside>
    );
}