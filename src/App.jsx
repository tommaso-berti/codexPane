import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import './App.css'
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import makeTheme from './styles/theme.js'
import Layout from "./components/Layout.jsx";
import TopicPage from "./components/TopicPage.jsx";
import SectPage from "./components/SectPage.jsx";
import Home from "./components/Home.jsx";

function App() {
    const mode = useSelector((state) => state.theme.mode);
    const theme = useMemo(() => makeTheme(mode), [mode]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path=":docs" element={<TopicPage />} />
                        <Route path=":docs/:section" element={<SectPage />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App