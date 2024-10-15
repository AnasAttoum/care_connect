import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosInstance } from '../axiosInstance'
import { room } from '../../constants/types'

export const getRooms = createAsyncThunk(
  'room/getDepartments',
  async () => {
    const response = await axiosInstance.get('rooms')
    return response.data
  },
)


const initialState: { loading: string, rooms: room[] } = {
  loading: '',
  rooms: []
}

export const roomSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRooms.fulfilled, (state, action) => {
      state.loading = 'fulfilled'
      console.log(state)
      console.log(action)
      //   state.entities.push(action.payload)
    })
      .addCase(getRooms.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(getRooms.rejected, (state) => {
        state.loading = 'rejected'
      })
  },
})

export default roomSlice.reducer