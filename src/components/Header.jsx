import DocMenu from "./DocMenu.jsx";
import Breadcrumb from "./Breadcrumb.jsx";

export default function Header() {
    return (
        <header className="border-b border-black h-18 top-0 w-full fixed z-10 bg-white flex items-center">
            <div className="flex items-baseline gap-6 pl-5">
                <h1 className="text-black text-4xl font-bold">CodexPane</h1>
                <DocMenu />
                <Breadcrumb />
            </div>
        </header>
    );
}