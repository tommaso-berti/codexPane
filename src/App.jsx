import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import './App.css'
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { useSelector } from "react-redux";
import theme from './styles/theme.js'
import Layout from "./components/Layout.jsx";
import TopicPage from "./components/TopicPage.jsx";
import SectPage from "./components/SectPage.jsx";
import Home from "./components/Home.jsx";

function App() {
    const mode = useSelector((state) => state.theme.mode);
    console.log("Current theme mode:", mode);
    const theme = createTheme({
        palette: {
            mode
        },
    });
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