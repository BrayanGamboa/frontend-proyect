import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Semaforo from './Semaforo'
import Card from './Card'
import ListaTareas from './ListaTareas'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Card /> */}
    {/* <Semaforo /> */}
    <ListaTareas />
  </StrictMode>,
)
