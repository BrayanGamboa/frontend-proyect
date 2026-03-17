import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Semaforo from './Semaforo'
import Card from './Card'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Card /> */}
    <Semaforo />
  </StrictMode>,
)
