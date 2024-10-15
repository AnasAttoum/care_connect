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

export const getRoom = createAsyncThunk(
  'room/getRoom',
  async (id: string) => {
    const response = await axiosInstance.get(`rooms/${id}`)
    return response.data
  },
)

export const postRoom = createAsyncThunk(
  'room/postRoom',
  async (data: FormData) => {
    const response = await axiosInstance.post('rooms', data)
    return response.data
  },
)

export const putRoom = createAsyncThunk(
  'room/putRoom',
  async ({ data, id }: { data: FormData, id: string }) => {
    const response = await axiosInstance.put(`rooms/${id}`, data)
    return response.data
  },
)

export const deleteRoom = createAsyncThunk(
  'room/deleteRoom',
  async (id: string) => {
    const response = await axiosInstance.delete(`rooms/${id}`)
    return response.data
  },
)

const initialState: { loading: string, loadingRoom: string, loadingPost: string, loadingPut: string, loadingDelete: string, rooms: room[] } = {
  loading: '',
  loadingRoom: '',
  loadingPost: '',
  loadingPut: '',
  loadingDelete: '',
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

      .addCase(getRoom.fulfilled, (state, action) => {
        state.loadingRoom = 'fulfilled'
        console.log(state)
        console.log(action)
        //   state.entities.push(action.payload)
      })
      .addCase(getRoom.pending, (state) => {
        state.loadingRoom = 'pending'
      })
      .addCase(getRoom.rejected, (state) => {
        state.loadingRoom = 'rejected'
      })

      .addCase(postRoom.fulfilled, (state, action) => {
        state.loadingPost = 'fulfilled'
        console.log(state)
        console.log(action)
        //   state.entities.push(action.payload)
      })
      .addCase(postRoom.pending, (state) => {
        state.loadingPost = 'pending'
      })
      .addCase(postRoom.rejected, (state) => {
        state.loadingPost = 'rejected'
      })

      .addCase(putRoom.fulfilled, (state, action) => {
        state.loadingPut = 'fulfilled'
        console.log(state)
        console.log(action)
        //   state.entities.push(action.payload)
      })
      .addCase(putRoom.pending, (state) => {
        state.loadingPut = 'pending'
      })
      .addCase(putRoom.rejected, (state) => {
        state.loadingPut = 'rejected'
      })

      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.loadingDelete = 'fulfilled'
        console.log(state)
        console.log(action)
        //   state.entities.push(action.payload)
      })
      .addCase(deleteRoom.pending, (state) => {
        state.loadingDelete = 'pending'
      })
      .addCase(deleteRoom.rejected, (state) => {
        state.loadingDelete = 'rejected'
      })
  },
})

export default roomSlice.reducer