import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosInstance } from '../axiosInstance'
import { surgery } from '../../constants/types'

export const getSurgeries = createAsyncThunk(
  'surgerery/getSurgeries',
  async () => {
    const response = await axiosInstance.get('surjical-operations')
    return response.data
  },
)

export const getSurgery = createAsyncThunk(
  'surgerery/getSurgery',
  async (id: string) => {
    const response = await axiosInstance.get(`surjical-operations/${id}`)
    return response.data
  },
)

export const postSurgery = createAsyncThunk(
  'surgerery/postSurgery',
  async (data: FormData) => {
    const response = await axiosInstance.post('surjical-operations', data)
    return response.data
  },
)

export const putSurgery = createAsyncThunk(
  'surgery/putSurgery',
  async ({ data, id }: { data: FormData, id: string }) => {
    const response = await axiosInstance.put(`surjical-operations/${id}`, data)
    return response.data
  },
)

export const deleteSurgery = createAsyncThunk(
  'surgerery/deleteSurgery',
  async (id: string) => {
    const response = await axiosInstance.delete(`surjical-operations/${id}`)
    return response.data
  },
)

const initialState: { loading: string, loadingSurgery: string, loadingPost: string, loadingPut: string, loadingDelete: string, surgeries: surgery[] } = {
  loading: '',
  loadingSurgery: '',
  loadingPost: '',
  loadingPut: '',
  loadingDelete: '',
  surgeries: []
}

export const SurgeriesSlice = createSlice({
  name: 'surgery',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSurgeries.fulfilled, (state, action) => {
      state.loading = 'fulfilled'
      console.log(state)
      console.log(action)
      //   state.entities.push(action.payload)
    })
      .addCase(getSurgeries.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(getSurgeries.rejected, (state) => {
        state.loading = 'rejected'
      })

      .addCase(getSurgery.fulfilled, (state, action) => {
        state.loadingSurgery = 'fulfilled'
        console.log(state)
        console.log(action)
        //   state.entities.push(action.payload)
      })
      .addCase(getSurgery.pending, (state) => {
        state.loadingSurgery = 'pending'
      })
      .addCase(getSurgery.rejected, (state) => {
        state.loadingSurgery = 'rejected'
      })

      .addCase(postSurgery.fulfilled, (state, action) => {
        state.loadingPost = 'fulfilled'
        console.log(state)
        console.log(action)
        //   state.entities.push(action.payload)
      })
      .addCase(postSurgery.pending, (state) => {
        state.loadingPost = 'pending'
      })
      .addCase(postSurgery.rejected, (state) => {
        state.loadingPost = 'rejected'
      })

      .addCase(putSurgery.fulfilled, (state, action) => {
        state.loadingPut = 'fulfilled'
        console.log(state)
        console.log(action)
        //   state.entities.push(action.payload)
      })
      .addCase(putSurgery.pending, (state) => {
        state.loadingPut = 'pending'
      })
      .addCase(putSurgery.rejected, (state) => {
        state.loadingPut = 'rejected'
      })

      .addCase(deleteSurgery.fulfilled, (state, action) => {
        state.loadingDelete = 'fulfilled'
        console.log(state)
        console.log(action)
        //   state.entities.push(action.payload)
      })
      .addCase(deleteSurgery.pending, (state) => {
        state.loadingDelete = 'pending'
      })
      .addCase(deleteSurgery.rejected, (state) => {
        state.loadingDelete = 'rejected'
      })
  },
})

export default SurgeriesSlice.reducer