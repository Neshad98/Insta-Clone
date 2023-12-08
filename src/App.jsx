
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import AuthPage from './pages/AuthPage/AuthPage'
import PageLayout from './Layouts/PageLayout/PageLayout'

function App() {


  return (
    <PageLayout>
      <Routes>
        <Route path='/' element={<HomePage></HomePage>}></Route>
        <Route path='/auth' element={<AuthPage></AuthPage>}></Route>
      </Routes>
    </PageLayout>
  )
}

export default App
