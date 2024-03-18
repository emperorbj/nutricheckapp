import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Register from '/src/components/Register';
import Login from './components/Login';
import Notfound from './components/Notfound';
function App() {
  return (
    <>
        <BrowserRouter>
              <Routes>

                  <Route path='/' element={<Login/>}/>

                  <Route path='/register' element={<Register/>}/>

                  <Route path='/login' element={<Login/>}/>

                  <Route path='*' element={<Notfound/>}/>

              </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
