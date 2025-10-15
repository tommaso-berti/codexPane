import {Route, BrowserRouter, Routes, Navigate} from "react-router-dom";
import './App.css'
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from './styles/theme.js'
import Layout from "./components/Layout.jsx";
import DocPage from "./components/DocPage.jsx";
import SectPage from "./components/SectPage.jsx";
import Home from "./components/Home.jsx";


function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path=":docs" element={<DocPage />} />
                        <Route path=":docs/:section" element={<SectPage />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App