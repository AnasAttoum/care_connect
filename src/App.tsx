import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { lazy } from 'react'

import Header from './components/Header'

const LazyDepartments = lazy(() => import('./pages/Departments'))


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Header />}>

          <Route index element={<LazyDepartments />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
