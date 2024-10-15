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


const initialState: { loading: string, departments: department[] } = {
  loading: '',
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
  },
})

export default departmentSlice.reducer