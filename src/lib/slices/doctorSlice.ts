import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosInstance } from '../axiosInstance'

export const getDoctors = createAsyncThunk(
  'doctor/getDoctors',
  async () => {
    const response = await axiosInstance.get('doctors')
    return response.data
  },
)

export const getDoctor = createAsyncThunk(
  'doctor/getDoctor',
  async (id: string) => {
    const response = await axiosInstance.get(`doctors/${id}`)
    return response.data
  },
)

export const postDoctor = createAsyncThunk(
  'doctor/postDoctor',
  async (data:any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('doctors', data)
      return response.data
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  },
)

export const putDoctor = createAsyncThunk(
  'doctor/putDoctor',
  async ({ data, id }: { data: FormData, id: string }, { rejectWithValue }) => {
    try {
    const response = await axiosInstance.put(`doctors/${id}`, data)
    return response.data
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
  },
)

export const deleteDoctor = createAsyncThunk(
  'doctor/deleteDoctor',
  async (id: string) => {
    const response = await axiosInstance.delete(`doctors/${id}`)
    return response.data
  },
)

const initialState: { loading: string, loadingDoctor: string, loadingPost: string, loadingPut: string, loadingDelete: string } = {
  loading: '',
  loadingDoctor: '',
  loadingPost: '',
  loadingPut: '',
  loadingDelete: '',
}

export const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDoctors.fulfilled, (state) => {
      state.loading = 'fulfilled'
      //   state.entities.push(action.payload)
    })
      .addCase(getDoctors.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(getDoctors.rejected, (state) => {
        state.loading = 'rejected'
      })

      .addCase(getDoctor.fulfilled, (state) => {
        state.loadingDoctor = 'fulfilled'
        //   state.entities.push(action.payload)
      })
      .addCase(getDoctor.pending, (state) => {
        state.loadingDoctor = 'pending'
      })
      .addCase(getDoctor.rejected, (state) => {
        state.loadingDoctor = 'rejected'
      })

      .addCase(postDoctor.fulfilled, (state) => {
        state.loadingPost = 'fulfilled'
        //   state.entities.push(action.payload)
      })
      .addCase(postDoctor.pending, (state) => {
        state.loadingPost = 'pending'
      })
      .addCase(postDoctor.rejected, (state) => {
        state.loadingPost = 'rejected'
      })

      .addCase(putDoctor.fulfilled, (state) => {
        state.loadingPut = 'fulfilled'
        //   state.entities.push(action.payload)
      })
      .addCase(putDoctor.pending, (state) => {
        state.loadingPut = 'pending'
      })
      .addCase(putDoctor.rejected, (state) => {
        state.loadingPut = 'rejected'
      })

      .addCase(deleteDoctor.fulfilled, (state) => {
        state.loadingDelete = 'fulfilled'
        //   state.entities.push(action.payload)
      })
      .addCase(deleteDoctor.pending, (state) => {
        state.loadingDelete = 'pending'
      })
      .addCase(deleteDoctor.rejected, (state) => {
        state.loadingDelete = 'rejected'
      })
  },
})

export default doctorSlice.reducer