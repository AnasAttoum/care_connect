import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'

import Header from './components/Header'
import Loading from './pages/Loading'

const LazyLogIn = lazy(() => import('./pages/LogIn'))

const LazyDepartments = lazy(() => import('./pages/Departments/Departments'))
const LazyAddDepartment = lazy(() => import('./pages/Departments/AddDepartment'))
const LazyEditDepartment = lazy(() => import('./pages/Departments/EditDepartment'))

const LazyRooms = lazy(() => import('./pages/Rooms/Rooms'))
const LazyAddRoom = lazy(() => import('./pages/Rooms/AddRoom'))
const LazyEditRoom = lazy(() => import('./pages/Rooms/EditRoom'))

const LazyDoctors = lazy(() => import('./pages/Doctors/Doctors'))
const LazyAddDoctor = lazy(() => import('./pages/Doctors/AddDoctor'))
const LazyEditDoctor = lazy(() => import('./pages/Doctors/EditDoctor'))

const LazyServices = lazy(() => import('./pages/Services/Services'))
const LazyAddService = lazy(() => import('./pages/Services/AddService'))
const LazyEditService = lazy(() => import('./pages/Services/EditService'))

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
          <Route path='rooms/add' element={<Suspense fallback={<Loading />}><LazyAddRoom /></Suspense>} />
          <Route path='rooms/edit/:id' element={<Suspense fallback={<Loading />}><LazyEditRoom /></Suspense>} />

          <Route path='doctors' element={<Suspense fallback={<Loading />}><LazyDoctors /></Suspense>} />
          <Route path='doctors/add' element={<Suspense fallback={<Loading />}><LazyAddDoctor /></Suspense>} />
          <Route path='doctors/edit/:id' element={<Suspense fallback={<Loading />}><LazyEditDoctor /></Suspense>} />

          <Route path='services' element={<Suspense fallback={<Loading />}><LazyServices /></Suspense>} />
          <Route path='services/add' element={<Suspense fallback={<Loading />}><LazyAddService /></Suspense>} />
          <Route path='services/edit/:id' element={<Suspense fallback={<Loading />}><LazyEditService /></Suspense>} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
