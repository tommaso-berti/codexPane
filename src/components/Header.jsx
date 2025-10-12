import DocMenu from "./DocMenu.jsx";

export default function Header() {
    return (
        <header className="border-b border-black h-20 p-6 top-0 w-full fixed z-10 bg-white flex items-baseline gap-6">
            <h1 className="text-black text-4xl font-bold">CodexPane</h1>
            <DocMenu />
        </header>
    );
}