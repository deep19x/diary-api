import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { useState } from 'react'
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import ProtectedRoute from './components/protectedRoute';
import CreateDiary from './pages/createDiary';
import EditDiary from './pages/editDiary';


function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/dashboard' element={
            <ProtectedRoute> 
              <Dashboard/>
            </ProtectedRoute>
          }/>
          <Route path='/create' element={<CreateDiary/>}/>
          <Route path='/diary/edit/:id' element={<EditDiary/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
