import './App.css'
import { ListOfUsers } from './componenst/listOfUsers'
import { CreateNewUser } from './componenst/CreateNewUser'
import { Toaster } from 'sonner'

function App () {
  return (
    <div className="p-6 max-w-4xl mx-auto flex flex-col gap-4">
      <ListOfUsers />
      <CreateNewUser />
      <Toaster richColors position="bottom-right" />
    </div>
  )
}

export default App
