
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import AuthPage from './pages/AuthPage/AuthPage'
import PageLayout from './Layouts/PageLayout/PageLayout'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase/firebase'

// just making a comment for git push xD 

function App() {
  //state from zustand
  // const authUser = useAuthStore(state => state.user);
  const [authUser] = useAuthState(auth);
  return (
    <PageLayout>
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/auth" />}></Route>
        <Route path='/auth' element={!authUser ? <AuthPage /> : <Navigate to="/" />}></Route>
        <Route path='/:username' element={<ProfilePage />}></Route>
      </Routes>
    </PageLayout>
  )
}

export default App
