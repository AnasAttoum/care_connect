import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosInstance } from '../axiosInstance'

export const getMedicalRecords = createAsyncThunk(
  'medicalRecord/getMedicalRecords',
  async (page: number) => {
    const response = await axiosInstance.get(`medical-records?page=${page}`)
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
  async (data:any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('medical-records', data)
      return response.data
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  },
)

export const putMedicalRecord = createAsyncThunk(
  'medicalRecord/putMedicalRecord',
  async ({ data, id }: { data: any, id: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`medical-records/${id}`, data)
      return response.data
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  },
)

export const deleteMedicalRecord = createAsyncThunk(
  'medicalRecord/deleteMedicalRecord',
  async (id: string) => {
    const response = await axiosInstance.delete(`medical-records/${id}`)
    return response.data
  },
)

const initialState: { loading: string, loadingMedicalRecord: string, loadingPost: string, loadingPut: string, loadingDelete: string } = {
  loading: '',
  loadingMedicalRecord: '',
  loadingPost: '',
  loadingPut: '',
  loadingDelete: '',
}

export const medicalRecordSlice = createSlice({
  name: 'medicalRecords',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMedicalRecords.fulfilled, (state) => {
      state.loading = 'fulfilled'
      //   state.entities.push(action.payload)
    })
      .addCase(getMedicalRecords.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(getMedicalRecords.rejected, (state) => {
        state.loading = 'rejected'
      })

      .addCase(getMedicalRecord.fulfilled, (state) => {
        state.loadingMedicalRecord = 'fulfilled'
        //   state.entities.push(action.payload)
      })
      .addCase(getMedicalRecord.pending, (state) => {
        state.loadingMedicalRecord = 'pending'
      })
      .addCase(getMedicalRecord.rejected, (state) => {
        state.loadingMedicalRecord = 'rejected'
      })

      .addCase(postMedicalRecord.fulfilled, (state) => {
        state.loadingPost = 'fulfilled'
        //   state.entities.push(action.payload)
      })
      .addCase(postMedicalRecord.pending, (state) => {
        state.loadingPost = 'pending'
      })
      .addCase(postMedicalRecord.rejected, (state) => {
        state.loadingPost = 'rejected'
      })

      .addCase(putMedicalRecord.fulfilled, (state) => {
        state.loadingPut = 'fulfilled'
        //   state.entities.push(action.payload)
      })
      .addCase(putMedicalRecord.pending, (state) => {
        state.loadingPut = 'pending'
      })
      .addCase(putMedicalRecord.rejected, (state) => {
        state.loadingPut = 'rejected'
      })

      .addCase(deleteMedicalRecord.fulfilled, (state) => {
        state.loadingDelete = 'fulfilled'
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

export default medicalRecordSlice.reducer