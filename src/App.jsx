import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Home} from './pages/Home/Home'
import {Register} from './pages/Register/Register'
import {Login} from './pages/Login/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Home/>
     {/* <Register/> */}
     {/* <Login/> */}
    </>
  )
}

export default App
