import {Header} from './components/index'
import { Outlet } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './provider/AuthProvider';
import { Toaster } from 'react-hot-toast';
import "../src/styles/Variables.css";

function App() {
    const isCodeEditorPage = location.pathname === "/codeEditor";

    const containerStyle = isCodeEditorPage
        ? { display: "flex", flexDirection: "column", marginTop: "6.5rem", marginLeft: "6.5rem", marginRight: "6.5rem" }
        : { display: "flex", flexDirection: "column", alignItems: "center", marginTop: "6.5rem" };

  return (
      <AuthProvider>
      <Toaster/>
      <div>
      <Header></Header>
      
      </div>      
      <div style={containerStyle}>
        <Outlet />

        </div>
   </AuthProvider>
       
  )
}

export default App
