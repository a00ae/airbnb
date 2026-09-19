import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.scss'
import { ApartmentsProvider } from './context/ApartmentsContext.tsx'
import App from './App.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApartmentsProvider>
      <App/>
    </ApartmentsProvider>
  </StrictMode>,
)
