import { useState } from 'react'
import './App.css'
import AdminRoutes from './routes/adminRoutes/AdminRoutes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
     <AdminRoutes />
    </div>
  )
}

export default App
