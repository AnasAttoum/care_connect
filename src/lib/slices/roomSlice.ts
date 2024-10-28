import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosInstance } from '../axiosInstance'

export const getRooms = createAsyncThunk(
  'room/getRooms',
  async (page: number) => {
    const response = await axiosInstance.get(`rooms?page=${page}`)
    return response.data
  },
)

export const getListOfRooms = createAsyncThunk(
  'room/getListOfRooms',
  async () => {
    const response = await axiosInstance.get('roomList')
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
  async (data: FormData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('rooms', data)
      return response.data
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  },
)

export const putRoom = createAsyncThunk(
  'room/putRoom',
  async ({ data, id }: { data: FormData, id: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`rooms/${id}`, data)
      return response.data
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  },
)

export const deleteRoom = createAsyncThunk(
  'room/deleteRoom',
  async (id: string) => {
    const response = await axiosInstance.delete(`rooms/${id}`)
    return response.data
  },
)

const initialState: { loading: string, loadingRoom: string, loadingPost: string, loadingPut: string, loadingDelete: string } = {
  loading: '',
  loadingRoom: '',
  loadingPost: '',
  loadingPut: '',
  loadingDelete: '',
}

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRooms.fulfilled, (state) => {
      state.loading = 'fulfilled'
      //   state.entities.push(action.payload)
    })
      .addCase(getRooms.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(getRooms.rejected, (state) => {
        state.loading = 'rejected'
      })

      .addCase(getRoom.fulfilled, (state) => {
        state.loadingRoom = 'fulfilled'
        //   state.entities.push(action.payload)
      })
      .addCase(getRoom.pending, (state) => {
        state.loadingRoom = 'pending'
      })
      .addCase(getRoom.rejected, (state) => {
        state.loadingRoom = 'rejected'
      })

      .addCase(postRoom.fulfilled, (state) => {
        state.loadingPost = 'fulfilled'
        //   state.entities.push(action.payload)
      })
      .addCase(postRoom.pending, (state) => {
        state.loadingPost = 'pending'
      })
      .addCase(postRoom.rejected, (state) => {
        state.loadingPost = 'rejected'
      })

      .addCase(putRoom.fulfilled, (state) => {
        state.loadingPut = 'fulfilled'
        //   state.entities.push(action.payload)
      })
      .addCase(putRoom.pending, (state) => {
        state.loadingPut = 'pending'
      })
      .addCase(putRoom.rejected, (state) => {
        state.loadingPut = 'rejected'
      })

      .addCase(deleteRoom.fulfilled, (state) => {
        state.loadingDelete = 'fulfilled'
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