import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Register from '/src/components/Register';
import Login from './components/Login';
import Notfound from './components/Notfound';
import Track from './components/Track';
import { UserContext } from './components/contexts/UserContext';
import { useState } from 'react';
import Private from './components/Private';
import TrackDiet from './components/contexts/TrackDiet';


function App() {

  const [loggedUser,setloggedUser] = useState(JSON.parse(localStorage.getItem('nutricheck-user')))



  return (
    <>
      <BrowserRouter>
    

        <UserContext.Provider value={{loggedUser,setloggedUser}}>

        

              <Routes>

                  <Route path='/' element={<Login/>}/>

                  <Route path='/register' element={<Register/>}/>

                  <Route path='/login' element={<Login/>}/>
                  {/* IF USER TRIES TO GO TO TRACK COMPONENT FIRST TAKE HIM TO THE PRIVATE COMPONENT */}
                  <Route path='/track' element={<Private Component={Track}/>}/>

                  <Route path='/diet' element={<Private Component={TrackDiet}/>}/>

                  <Route path='*' element={<Notfound/>}/>

              </Routes>



        </UserContext.Provider>
      </BrowserRouter>
    </>
  )
}

export default App
