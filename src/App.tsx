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

const LazyPatients = lazy(() => import('./pages/Patients/Patients'))
const LazyAddPatient = lazy(() => import('./pages/Patients/AddPatient'))
const LazyEditPatient = lazy(() => import('./pages/Patients/EditPatient'))
const LazyMedicalRecords = lazy(() => import('./pages/Patients/MedicalRecords/MedicalRecords'))
const LazyAddMedicalRecord = lazy(() => import('./pages/Patients/MedicalRecords/AddMedicalRecord'))
const LazyEditMedicalRecord = lazy(() => import('./pages/Patients/MedicalRecords/EditMedicalRecord'))

const LazySurgeries = lazy(() => import('./pages/Surgeries/Surgeries'))
const LazyAddSurgery = lazy(() => import('./pages/Surgeries/AddSurgery'))
const LazyEditSurgery = lazy(() => import('./pages/Surgeries/EditSurgery'))

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

          <Route path='patients' element={<Suspense fallback={<Loading />}><LazyPatients /></Suspense>} />
          <Route path='patients/add' element={<Suspense fallback={<Loading />}><LazyAddPatient /></Suspense>} />
          <Route path='patients/edit/:id' element={<Suspense fallback={<Loading />}><LazyEditPatient /></Suspense>} />
          <Route path='patients/:id' element={<Suspense fallback={<Loading />}><LazyMedicalRecords /></Suspense>} />
          <Route path='patients/:patientId/add' element={<Suspense fallback={<Loading />}><LazyAddMedicalRecord /></Suspense>} />
          <Route path='patients/:patientId/edit/:id' element={<Suspense fallback={<Loading />}><LazyEditMedicalRecord /></Suspense>} />

          <Route path='surgeries' element={<Suspense fallback={<Loading />}><LazySurgeries /></Suspense>} />
          <Route path='surgeries/add' element={<Suspense fallback={<Loading />}><LazyAddSurgery /></Suspense>} />
          <Route path='surgeries/edit/:id' element={<Suspense fallback={<Loading />}><LazyEditSurgery /></Suspense>} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
