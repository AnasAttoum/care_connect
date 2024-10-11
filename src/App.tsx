import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'

import Header from './components/Header'
import Loading from './pages/Loading'

const LazyLogIn = lazy(() => import('./pages/LogIn'))
const LazyDepartments = lazy(() => import('./pages/Departments/Departments'))
const LazyAddDepartment = lazy(() => import('./pages/Departments/AddDepartment'))
const LazyEditDepartment = lazy(() => import('./pages/Departments/EditDepartment'))
const LazyRooms = lazy(() => import('./pages/Rooms/Rooms'))

function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/login' element={<Suspense fallback={<Loading />}><LazyLogIn /></Suspense>} />

        <Route path='/' element={<Header />}>

          <Route index element={<Suspense fallback={<Loading />}><LazyDepartments /></Suspense>} />
          <Route path='departments/add' element={<Suspense fallback={<Loading />}><LazyAddDepartment /></Suspense>} />
          <Route path='departments/edit/:id' element={<Suspense fallback={<Loading />}><LazyEditDepartment /></Suspense>} />

          <Route path='rooms' element={<Suspense fallback={<Loading />}><LazyRooms /></Suspense>} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
