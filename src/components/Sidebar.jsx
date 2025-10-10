import SectMenu from './SectMenu.jsx';

export default function Sidebar() {
    return (
        <aside className="flex flex-col w-[300px] border-r border-black overflow-y-auto min-h-0">
            <SectMenu />
        </aside>
    );
}