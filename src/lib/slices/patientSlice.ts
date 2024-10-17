import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosInstance } from '../axiosInstance'
import { patient } from '../../constants/types'

export const getPatients = createAsyncThunk(
  'patient/getPatients',
  async () => {
    const response = await axiosInstance.get('patients')
    return response.data
  },
)

export const getPatient = createAsyncThunk(
  'patient/getPatient',
  async (id: string) => {
    const response = await axiosInstance.get(`patients/${id}`)
    return response.data
  },
)

export const postPatient = createAsyncThunk(
  'patient/postPatient',
  async (data: FormData) => {
    const response = await axiosInstance.post('patients', data)
    return response.data
  },
)

export const putPatient = createAsyncThunk(
  'patient/putPatient',
  async ({ data, id }: { data: FormData, id: string }) => {
    const response = await axiosInstance.put(`patients/${id}`, data)
    return response.data
  },
)

export const deletePatient = createAsyncThunk(
  'patient/deletePatient',
  async (id: string) => {
    const response = await axiosInstance.delete(`patients/${id}`)
    return response.data
  },
)

const initialState: { loading: string, loadingPatient: string, loadingPost: string, loadingPut: string, loadingDelete: string, patients: patient[] } = {
  loading: '',
  loadingPatient: '',
  loadingPost: '',
  loadingPut: '',
  loadingDelete: '',
  patients: []
}

export const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPatients.fulfilled, (state, action) => {
      state.loading = 'fulfilled'
      console.log(state)
      console.log(action)
      //   state.entities.push(action.payload)
    })
      .addCase(getPatients.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(getPatients.rejected, (state) => {
        state.loading = 'rejected'
      })

      .addCase(getPatient.fulfilled, (state, action) => {
        state.loadingPatient = 'fulfilled'
        console.log(state)
        console.log(action)
        //   state.entities.push(action.payload)
      })
      .addCase(getPatient.pending, (state) => {
        state.loadingPatient = 'pending'
      })
      .addCase(getPatient.rejected, (state) => {
        state.loadingPatient = 'rejected'
      })

      .addCase(postPatient.fulfilled, (state, action) => {
        state.loadingPost = 'fulfilled'
        console.log(state)
        console.log(action)
        //   state.entities.push(action.payload)
      })
      .addCase(postPatient.pending, (state) => {
        state.loadingPost = 'pending'
      })
      .addCase(postPatient.rejected, (state) => {
        state.loadingPost = 'rejected'
      })

      .addCase(putPatient.fulfilled, (state, action) => {
        state.loadingPut = 'fulfilled'
        console.log(state)
        console.log(action)
        //   state.entities.push(action.payload)
      })
      .addCase(putPatient.pending, (state) => {
        state.loadingPut = 'pending'
      })
      .addCase(putPatient.rejected, (state) => {
        state.loadingPut = 'rejected'
      })

      .addCase(deletePatient.fulfilled, (state, action) => {
        state.loadingDelete = 'fulfilled'
        console.log(state)
        console.log(action)
        //   state.entities.push(action.payload)
      })
      .addCase(deletePatient.pending, (state) => {
        state.loadingDelete = 'pending'
      })
      .addCase(deletePatient.rejected, (state) => {
        state.loadingDelete = 'rejected'
      })
  },
})

export default patientSlice.reducer