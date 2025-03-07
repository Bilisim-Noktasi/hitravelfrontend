import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { TourSubCategory } from "@/types";
import { getRequest } from "@/service/requestService";

const initialState: TourSubCategory = {
    subCategory: null,
    subCategories: [],
};

const tourSubCategorySlice = createSlice({
    name: 'tourSubCategory',
    initialState,
    reducers: {
        getSubCategories: (state, action) => {
            state.subCategories = action.payload;
        },
        getSubCategory: (state, action) => {
            state.subCategories = action.payload;
        }
    },
});

export const getTourSubCategoriesDispatch = (page: number, size: number) => async (dispatch: Dispatch) => {
    getRequest({
            controller: "SubCategories",
            params: { PageIndex: page, PageSize: size },
        })
        .then(res=>{
            if (res?.items) {
                dispatch(getSubCategories(res.items));
                console.log("subCategories", res.items)
            } else {
                console.error("❌ Hata: Redux'a gönderilecek alt kategori verisi bulunamadı!");
            }
        }).catch(error => console.error("❌ API Error:", error));
};

export const getTourSubCategoryDispatch = (subCategoryId: string, setLoading: (value: boolean) => void) => async (dispatch: Dispatch) => {
    setLoading(true);

    try {
        const res = await getRequest({
            controller: "SubCategories",
            action: subCategoryId,
            params: {},
        });

        if (res?.data) {
            dispatch(getSubCategories([res.items]));
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

export const { getSubCategories, getSubCategory } = tourSubCategorySlice.actions;
export default tourSubCategorySlice.reducer;
