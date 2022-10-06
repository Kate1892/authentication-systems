import { Routes, Route } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { Authorization, PasswordRec, PersonalArea, Registration } from './pages'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Navigate to='/authorization' />} />
        <Route path='/authorization' element={<Authorization />} />
        <Route path='/password-recovery' element={<PasswordRec />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/personal-area' element={<PersonalArea />} />
      </Routes>
    </div>
  )
}

export default App
