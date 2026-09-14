import { createRoot } from 'react-dom/client'
import { App } from './App'

const container = document.getElementById('app') // Debe coincidir exactamente con el ID del HTML
const root = createRoot(container)
root.render(<App />)