import { useState } from 'react'
import {Route, BrowserRouter, Routes} from "react-router-dom";
import './App.css'
import Layout from "./components/Layout.jsx";
import DocPage from "./components/DocPage.jsx";

function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route element={<Layout />}>
                  <Route path="/" element={<h1>Home Page</h1>} />
                    <Route path="/docs" element={<DocPage />} />
              </Route>
          </Routes>
      </BrowserRouter>
  )
}

export default App