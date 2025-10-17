import DocMenu from "./DocMenu.jsx";
import Breadcrumb from "./Breadcrumb.jsx";
import SearchBar from "./SearchBar.jsx";

export default function Header() {
    return (
        <header className="border-b border-black h-18 top-0 w-full fixed z-10 bg-white flex items-center justify-between pl-5 pr-5">
            <div className="flex items-baseline gap-6 mr-5">
                <h1 className="text-black text-4xl font-bold">CodexPane</h1>
                <DocMenu />
                <Breadcrumb />
            </div>
            <div className="flex-1 max-w-md ml-5">
                <div>
                    <SearchBar />
                </div>
            </div>
        </header>
    );
}