import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../axiosInstance";

export const getSurgeries = createAsyncThunk(
  "surgerery/getSurgeries",
  async (page:number) => {
    const response = await axiosInstance.get(`surjical-operations?page=${page}`);
    return response.data;
  }
);

export const getSurgery = createAsyncThunk(
  "surgerery/getSurgery",
  async (id: string) => {
    const response = await axiosInstance.get(`surjical-operations/${id}`);
    return response.data;
  }
);

export const postSurgery = createAsyncThunk(
  "surgerery/postSurgery",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("surjical-operations", data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const putSurgery = createAsyncThunk(
  "surgery/putSurgery",
  async ({ data, id }: { data: any; id: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `surjical-operations/${id}`,
        data
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteSurgery = createAsyncThunk(
  "surgerery/deleteSurgery",
  async (id: string) => {
    const response = await axiosInstance.delete(`surjical-operations/${id}`);
    return response.data;
  }
);

const initialState: {
  loading: string;
  loadingSurgery: string;
  loadingPost: string;
  loadingPut: string;
  loadingDelete: string;
} = {
  loading: "",
  loadingSurgery: "",
  loadingPost: "",
  loadingPut: "",
  loadingDelete: "",
};

export const SurgeriesSlice = createSlice({
  name: "surgery",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSurgeries.fulfilled, (state) => {
        state.loading = "fulfilled";
        //   state.entities.push(action.payload)
      })
      .addCase(getSurgeries.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getSurgeries.rejected, (state) => {
        state.loading = "rejected";
      })

      .addCase(getSurgery.fulfilled, (state) => {
        state.loadingSurgery = "fulfilled";
        //   state.entities.push(action.payload)
      })
      .addCase(getSurgery.pending, (state) => {
        state.loadingSurgery = "pending";
      })
      .addCase(getSurgery.rejected, (state) => {
        state.loadingSurgery = "rejected";
      })

      .addCase(postSurgery.fulfilled, (state) => {
        state.loadingPost = "fulfilled";
        //   state.entities.push(action.payload)
      })
      .addCase(postSurgery.pending, (state) => {
        state.loadingPost = "pending";
      })
      .addCase(postSurgery.rejected, (state) => {
        state.loadingPost = "rejected";
      })

      .addCase(putSurgery.fulfilled, (state) => {
        state.loadingPut = "fulfilled";
        //   state.entities.push(action.payload)
      })
      .addCase(putSurgery.pending, (state) => {
        state.loadingPut = "pending";
      })
      .addCase(putSurgery.rejected, (state) => {
        state.loadingPut = "rejected";
      })

      .addCase(deleteSurgery.fulfilled, (state) => {
        state.loadingDelete = "fulfilled";
        //   state.entities.push(action.payload)
      })
      .addCase(deleteSurgery.pending, (state) => {
        state.loadingDelete = "pending";
      })
      .addCase(deleteSurgery.rejected, (state) => {
        state.loadingDelete = "rejected";
      });
  },
});

export default SurgeriesSlice.reducer;
