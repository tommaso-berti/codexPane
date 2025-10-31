import { APP_VERSION } from '../lib/version.js';
import {useState} from "react";
import ReleaseNotesModal from "./ReleaseNotesModal.jsx";

export default function Footer() {
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    return (
        <footer className="bottom-0 h-10 bg-white border-t flex items-center pl-4 pr-4 w-full justify-between">
            <h2 className="text-sm">Copyright by <a href={'http://www.tommasoberti.com'} className="cursor-pointer underline">Tommaso Berti</a> ©2025</h2>
            <h3 className="text-sm"><button onClick={()=> setOpen(true)} className="cursor-pointer">{APP_VERSION}</button></h3>
            <ReleaseNotesModal open={open} onClose={closeModal} />
        </footer>
    );
}