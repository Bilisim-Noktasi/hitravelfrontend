import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { TourCategory } from "@/types";
import { getRequest } from "@/service/requestService";

const initialState: TourCategory = {
    category: null,
    categories: [],
};

const tourCategorySlice = createSlice({
    name: 'tourCategory',
    initialState,
    reducers: {
        getCategories: (state, action) => {
            state.categories = action.payload;
        },
        getCategory: (state, action) => {
            state.category = action.payload;
        }
    },
});

export const getTourCategoriesDispatch = (page: number, size: number) => async (dispatch: Dispatch) => {
    getRequest({
            controller: "Categories",
            params: { PageIndex: page, PageSize: size },
        })
        .then(res=>{
            if (res?.items) {
                dispatch(getCategories(res.items));
            } else {
                console.error("❌ Hata: Redux'a gönderilecek kategori verisi bulunamadı!");
            }
        }).catch(error => console.error("❌ API Error:", error));
};

export const getTourCategoryDispatch = (categoryId: string, setLoading: (value: boolean) => void) => async (dispatch: Dispatch) => {
    setLoading(true); // Yükleme başladığında true yap

    try {
        const res = await getRequest({
            controller: "Categories",  // Controller kısmı doğru olmalı
            action: categoryId,  // Tek bir kategori almak için action olarak categoryId'yi kullanıyoruz
            params: {},
        });

        if (res?.data) {
            dispatch(getCategories([res.items])); // Tek bir kategori olduğu için array olarak gönderiyoruz
            console.log("✅ Redux'a Gönderilen Kategori:", res.items);
        } else {
            console.error("❌ Hata: Redux'a gönderilecek kategori verisi bulunamadı!");
        }
    } catch (error) {
        console.error("❌ API Hatası:", error);
    } finally {
        setLoading(false); // İstek tamamlandığında yüklemeyi durdur
    }
};

export const { getCategories, getCategory } = tourCategorySlice.actions;
export default tourCategorySlice.reducer;
