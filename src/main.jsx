import { StrictMode } from 'react'
import { DocsProvider } from "./constexts/DocsContext.jsx"
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <DocsProvider>
          <App />
      </DocsProvider>
  </StrictMode>,
)
