import {Route, BrowserRouter, Routes, Navigate} from "react-router-dom";
import './App.css'
import Layout from "./components/Layout.jsx";
import DocPage from "./components/DocPage.jsx";
import SectPage from "./components/SectPage.jsx";
import Home from "./components/Home.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path=":docs" element={<DocPage />} />
                    <Route path=":docs/:section/:subSection" element={<SectPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App