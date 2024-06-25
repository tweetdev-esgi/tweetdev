import './App.css'
import {Header} from './components/index'
import { Outlet } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import { AuthProvider } from './provider/AuthProvider';
import { Toaster } from 'react-hot-toast';
import "../src/styles/Variables.css";
function App() {

  return (
      <AuthProvider>
      <Toaster/>
      <div>
      <Header></Header>
      
      </div>      
      <div className="app-container" >
        <Outlet />

        </div>
   </AuthProvider>
       
  )
}

export default App
