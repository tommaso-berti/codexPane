import { StrictMode } from 'react'
import { DocsProvider } from "./contexts/DocsContext.jsx"
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store/store.js'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
          <DocsProvider>
              <App />
          </DocsProvider>
      </Provider>
  </StrictMode>,
)
