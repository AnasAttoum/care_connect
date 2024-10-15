import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosInstance } from '../axiosInstance'
import { service } from '../../constants/types'

export const getServices = createAsyncThunk(
  'service/getServices',
  async () => {
    const response = await axiosInstance.get('services')
    return response.data
  },
)

export const getService = createAsyncThunk(
  'service/getService',
  async (id: string) => {
    const response = await axiosInstance.get(`services/${id}`)
    return response.data
  },
)

export const postService = createAsyncThunk(
  'service/postService',
  async (data: FormData) => {
    const response = await axiosInstance.post('services', data)
    return response.data
  },
)

export const putService = createAsyncThunk(
  'service/putService',
  async ({ data, id }: { data: FormData, id: string }) => {
    const response = await axiosInstance.put(`services/${id}`, data)
    return response.data
  },
)

export const deleteService = createAsyncThunk(
  'service/deleteService',
  async (id: string) => {
    const response = await axiosInstance.delete(`services/${id}`)
    return response.data
  },
)

const initialState: { loading: string, loadingService: string, loadingPost: string, loadingPut: string, loadingDelete: string, services: service[] } = {
  loading: '',
  loadingService: '',
  loadingPost: '',
  loadingPut: '',
  loadingDelete: '',
  services: []
}

export const serviceSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getServices.fulfilled, (state, action) => {
      state.loading = 'fulfilled'
      console.log(state)
      console.log(action)
      //   state.entities.push(action.payload)
    })
      .addCase(getServices.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(getServices.rejected, (state) => {
        state.loading = 'rejected'
      })

      .addCase(getService.fulfilled, (state, action) => {
        state.loadingService = 'fulfilled'
        console.log(state)
        console.log(action)
        //   state.entities.push(action.payload)
      })
      .addCase(getService.pending, (state) => {
        state.loadingService = 'pending'
      })
      .addCase(getService.rejected, (state) => {
        state.loadingService = 'rejected'
      })

      .addCase(postService.fulfilled, (state, action) => {
        state.loadingPost = 'fulfilled'
        console.log(state)
        console.log(action)
        //   state.entities.push(action.payload)
      })
      .addCase(postService.pending, (state) => {
        state.loadingPost = 'pending'
      })
      .addCase(postService.rejected, (state) => {
        state.loadingPost = 'rejected'
      })

      .addCase(putService.fulfilled, (state, action) => {
        state.loadingPut = 'fulfilled'
        console.log(state)
        console.log(action)
        //   state.entities.push(action.payload)
      })
      .addCase(putService.pending, (state) => {
        state.loadingPut = 'pending'
      })
      .addCase(putService.rejected, (state) => {
        state.loadingPut = 'rejected'
      })

      .addCase(deleteService.fulfilled, (state, action) => {
        state.loadingDelete = 'fulfilled'
        console.log(state)
        console.log(action)
        //   state.entities.push(action.payload)
      })
      .addCase(deleteService.pending, (state) => {
        state.loadingDelete = 'pending'
      })
      .addCase(deleteService.rejected, (state) => {
        state.loadingDelete = 'rejected'
      })
  },
})

export default serviceSlice.reducer