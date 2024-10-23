import { configureStore } from '@reduxjs/toolkit'

import departmentSlice from './slices/departmentSlice'
import roomSlice from './slices/roomSlice'
import serviceSlice from './slices/serviceSlice'
import doctorSlice from './slices/doctorSlice'
import patientSlice from './slices/patientSlice'
import medicalRecordSlice from './slices/medicalRecordSlice'
import SurgeriesSlice from './slices/SurgeriesSlice'

export const store = configureStore({
  reducer: {
    department: departmentSlice,
    room: roomSlice,
    service: serviceSlice,
    doctor: doctorSlice,
    patient: patientSlice,
    medicalRecord: medicalRecordSlice,
    surgery:SurgeriesSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch