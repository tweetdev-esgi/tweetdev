import './App.css'
import {Header} from './components/index'
import { Outlet } from 'react-router-dom'

import toast, { Toaster } from 'react-hot-toast';
import "../src/styles/Variables.css";
function App() {

  return (
    <>
    <div>
      <Toaster/>
      <Header></Header>
      
      </div>      
      {/* <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop:"8rem"}}> */}

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop:"6.5rem"}}>
        <Outlet />
        </div>
      </>
       
  )
}

export default App
