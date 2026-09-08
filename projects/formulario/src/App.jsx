import { Routes, Route, Link } from "react-router"
import Inicio from "./page/Inicio"
import { Form } from "./components/Form"
function App() {
    return (
    <Routes>
      <Route path="/" element={<Inicio/>}/>
      <Route path="/agregarForm" element={<Form/>} />
    </Routes>
      
        
    )
}

export default App