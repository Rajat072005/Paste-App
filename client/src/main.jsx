import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './app/store.js'
import { Provider } from 'react-redux'
import { LoaderProvider } from "./context/LoaderContext";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <LoaderProvider>
        <App />
     </LoaderProvider>
    </Provider>
  </StrictMode>,
)
