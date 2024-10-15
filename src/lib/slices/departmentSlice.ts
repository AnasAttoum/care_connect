import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosInstance } from '../axiosInstance'
import { department } from '../../constants/types'

export const getDepartments = createAsyncThunk(
  'department/getDepartments',
  async () => {
    const response = await axiosInstance.get('departments')
    return response.data
  },
)

export const getDepartment = createAsyncThunk(
  'department/getDepartment',
  async (id: string) => {
    const response = await axiosInstance.get(`departments/${id}`)
    return response.data
  },
)

export const postDepartment = createAsyncThunk(
  'department/postDepartment',
  async (data: FormData) => {
    const response = await axiosInstance.post('departments', data)
    return response.data
  },
)

export const putDepartment = createAsyncThunk(
  'department/putDepartment',
  async ({ data, id }: { data: FormData, id: string }) => {
    const response = await axiosInstance.put(`departments/${id}`, data)
    return response.data
  },
)

export const deleteDepartment = createAsyncThunk(
  'department/deleteDepartment',
  async (id: string) => {
    const response = await axiosInstance.delete(`departments/${id}`)
    return response.data
  },
)

const initialState: { loading: string, loadingDepartment: string, loadingPost: string, loadingPut: string, loadingDelete: string, departments: department[] } = {
  loading: '',
  loadingDepartment: '',
  loadingPost: '',
  loadingPut: '',
  loadingDelete: '',
  departments: []
}

export const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDepartments.fulfilled, (state, action) => {
      state.loading = 'fulfilled'
      console.log(state)
      console.log(action)
      //   state.entities.push(action.payload)
    })
      .addCase(getDepartments.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(getDepartments.rejected, (state) => {
        state.loading = 'rejected'
      })

      .addCase(getDepartment.fulfilled, (state, action) => {
        state.loadingDepartment = 'fulfilled'
        console.log(state)
        console.log(action)
        //   state.entities.push(action.payload)
      })
      .addCase(getDepartment.pending, (state) => {
        state.loadingDepartment = 'pending'
      })
      .addCase(getDepartment.rejected, (state) => {
        state.loadingDepartment = 'rejected'
      })

      .addCase(postDepartment.fulfilled, (state, action) => {
        state.loadingPost = 'fulfilled'
        console.log(state)
        console.log(action)
        //   state.entities.push(action.payload)
      })
      .addCase(postDepartment.pending, (state) => {
        state.loadingPost = 'pending'
      })
      .addCase(postDepartment.rejected, (state) => {
        state.loadingPost = 'rejected'
      })

      .addCase(putDepartment.fulfilled, (state, action) => {
        state.loadingPut = 'fulfilled'
        console.log(state)
        console.log(action)
        //   state.entities.push(action.payload)
      })
      .addCase(putDepartment.pending, (state) => {
        state.loadingPut = 'pending'
      })
      .addCase(putDepartment.rejected, (state) => {
        state.loadingPut = 'rejected'
      })

      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.loadingDelete = 'fulfilled'
        console.log(state)
        console.log(action)
        //   state.entities.push(action.payload)
      })
      .addCase(deleteDepartment.pending, (state) => {
        state.loadingDelete = 'pending'
      })
      .addCase(deleteDepartment.rejected, (state) => {
        state.loadingDelete = 'rejected'
      })
  },
})

export default departmentSlice.reducer