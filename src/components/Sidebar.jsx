import SectMenu from './SectMenu.jsx';

export default function Sidebar() {
    return (
        <aside style={{ height: 'calc(100vh - 64px)', overflowY: 'auto' }}>
            <SectMenu />
        </aside>
    );
}