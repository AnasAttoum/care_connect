import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosInstance } from '../axiosInstance'
import { medicalRecord } from '../../constants/types'

export const getMedicalRecords = createAsyncThunk(
  'medicalRecord/getMedicalRecords',
  async () => {
    const response = await axiosInstance.get('medical-records')
    return response.data
  },
)

export const getMedicalRecord = createAsyncThunk(
  'medicalRecord/getMedicalRecord',
  async (id: string) => {
    const response = await axiosInstance.get(`medical-records/${id}`)
    return response.data
  },
)

export const postMedicalRecord = createAsyncThunk(
  'medicalRecord/postMedicalRecord',
  async (data: FormData) => {
    const response = await axiosInstance.post('medical-records', data)
    return response.data
  },
)

export const putMedicalRecord = createAsyncThunk(
  'medicalRecord/putMedicalRecord',
  async ({ data, id }: { data: FormData, id: string }) => {
    const response = await axiosInstance.put(`medical-records/${id}`, data)
    return response.data
  },
)

export const deleteMedicalRecord = createAsyncThunk(
  'medicalRecord/deleteMedicalRecord',
  async (id: string) => {
    const response = await axiosInstance.delete(`medical-records/${id}`)
    return response.data
  },
)

const initialState: { loading: string, loadingMedicalRecord: string, loadingPost: string, loadingPut: string, loadingDelete: string, MedicalRecords: medicalRecord[] } = {
  loading: '',
  loadingMedicalRecord: '',
  loadingPost: '',
  loadingPut: '',
  loadingDelete: '',
  MedicalRecords: []
}

export const medicalRecordsSlice = createSlice({
  name: 'medicalRecords',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMedicalRecords.fulfilled, (state, action) => {
      state.loading = 'fulfilled'
      console.log(state)
      console.log(action)
      //   state.entities.push(action.payload)
    })
      .addCase(getMedicalRecords.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(getMedicalRecords.rejected, (state) => {
        state.loading = 'rejected'
      })

      .addCase(getMedicalRecord.fulfilled, (state, action) => {
        state.loadingMedicalRecord = 'fulfilled'
        console.log(state)
        console.log(action)
        //   state.entities.push(action.payload)
      })
      .addCase(getMedicalRecord.pending, (state) => {
        state.loadingMedicalRecord = 'pending'
      })
      .addCase(getMedicalRecord.rejected, (state) => {
        state.loadingMedicalRecord = 'rejected'
      })

      .addCase(postMedicalRecord.fulfilled, (state, action) => {
        state.loadingPost = 'fulfilled'
        console.log(state)
        console.log(action)
        //   state.entities.push(action.payload)
      })
      .addCase(postMedicalRecord.pending, (state) => {
        state.loadingPost = 'pending'
      })
      .addCase(postMedicalRecord.rejected, (state) => {
        state.loadingPost = 'rejected'
      })

      .addCase(putMedicalRecord.fulfilled, (state, action) => {
        state.loadingPut = 'fulfilled'
        console.log(state)
        console.log(action)
        //   state.entities.push(action.payload)
      })
      .addCase(putMedicalRecord.pending, (state) => {
        state.loadingPut = 'pending'
      })
      .addCase(putMedicalRecord.rejected, (state) => {
        state.loadingPut = 'rejected'
      })

      .addCase(deleteMedicalRecord.fulfilled, (state, action) => {
        state.loadingDelete = 'fulfilled'
        console.log(state)
        console.log(action)
        //   state.entities.push(action.payload)
      })
      .addCase(deleteMedicalRecord.pending, (state) => {
        state.loadingDelete = 'pending'
      })
      .addCase(deleteMedicalRecord.rejected, (state) => {
        state.loadingDelete = 'rejected'
      })
  },
})

export default medicalRecordsSlice.reducer