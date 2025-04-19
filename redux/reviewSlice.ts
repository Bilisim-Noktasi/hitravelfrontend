import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest, postGuardRequest } from "@/service/requestService";

interface Review {
  id: string;
  userId: string;
  userFirstName: string;
  userLastName: string;
  targetId: string;
  rating: number;
  comment: string;
  reviewDate: string;
  isVerified: boolean;
  isPublished: boolean;
  targetType: number;
}

interface ReviewState {
  items: Review[];
  loading: boolean;
  error: string | null;
  page: number;
  pageSize: number;
  total: number;
}

const initialState: ReviewState = {
  items: [],
  loading: false,
  error: null,
  page: 1,
  pageSize: 5,
  total: 0,
};

// GET: yorumları getir (authentication gerekmez)
export const getReviewsDispatch = createAsyncThunk(
  "reviews/fetchReviews",
  async (
    {
      targetId,
      page,
      pageSize,
    }: { targetId: string; page: number; pageSize: number },
    thunkAPI
  ) => {
    try {
      const response = await getRequest({
        controller: "reviews",
        params: {
          targetId,
          page,
          pageSize,
        },
      });

      return {
        data: response.items,
        total: response.count,
        page: response.index + 1, // API 0 tabanlı gönderiyor, biz 1 tabanlı göstereceğiz
        pageSize: response.size,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Yorumlar alınamadı");
    }
  }
);

interface ReviewRequestModel {
  userId: string;
  targetId: string;
  rating: number;
  comment: string;
  isVerified: boolean;
  isPublished: boolean;
  targetType: number;
}

// POST: yorum ekle (authentication gerekir)
export const addReview = createAsyncThunk(
  "reviews/addReview",
  async (reviewData: ReviewRequestModel, thunkAPI) => {

    try {
      const response = await postGuardRequest(
        {
          controller: "Reviews",
        },
        reviewData
      );
      return response;
    } catch (error: any) {
      console.error("Yorum ekleme hatası:", error.message); // 🔥 Hata detaylı gösteriliyor mu?
      return thunkAPI.rejectWithValue(error.message || "Yorum eklenemedi");
    }
  }
);


const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    clearReviews: (state) => {
      state.items = [];
      state.page = 1;
      state.total = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReviewsDispatch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReviewsDispatch.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.page = action.payload.page;
        state.pageSize = action.payload.pageSize;
        state.total = action.payload.total;
      })
      .addCase(getReviewsDispatch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload); // yeni yorumu en başa ekle
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearReviews } = reviewSlice.actions;
export default reviewSlice.reducer;
