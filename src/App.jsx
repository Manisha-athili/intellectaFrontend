
import Navbar from './Components/NavBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routes from './Routes';
const App = ()=> {
  return(
    <>
      <Navbar />
      <Routes/>
     <ToastContainer />
    </>
  )
}

export default App ;