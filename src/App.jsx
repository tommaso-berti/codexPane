import { useState } from 'react'
import {Route, BrowserRouter, Routes} from "react-router-dom";
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
                    <Route path="docs" element={<DocPage />} />
                    <Route path="docs/:section/:slug" element={<SectPage />} />
                    <Route path="*" element={<div>Not found</div>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App