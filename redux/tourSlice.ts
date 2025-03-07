import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { TourState } from "@/types";
import { getRequest } from "@/service/requestService";

const initialState: TourState = {
    tour: null,
    tours: []
}

const tourSlice = createSlice({
    name: 'tour',
    initialState,
    reducers: {
        getTours: (state, action) => {
            state.tours = action.payload
        },
        getTour: (state, action) => {
            state.tour = action.payload
        }
    }
})

export const getToursDispatch = (page: number, size: number) => async (dispatch: Dispatch) => {
    getRequest({
        controller: "Tours",
        params: { PageIndex: page, PageSize: size }
    })
        .then(res => {
            
            if (res?.items) {
                dispatch(getTours(res.items));
            } else {
                console.error("❌ Hata: Redux'a gönderilecek veri bulunamadı!");
            }
        })
        .catch(error => console.error("❌ API Error:", error));
};

export const getTourDispatch = (tourId: string, setLoading: (value: boolean) => void) => async (dispatch: Dispatch) => {
    setLoading(true); // Yükleme başladığında true yap

    getRequest({
        controller: "Tours",
        action: tourId,
        params: {}
    })
        .then(res => {
            dispatch(getTour(res)); // Redux state'ine gönderiyoruz

            // if (res?.data) {
            //     dispatch(getTour(res.data)); // Redux state'ine gönderiyoruz
            // } else {
            //     console.error("❌ Hata: Redux'a gönderilecek tur verisi bulunamadı!");
            // }
        })
        .catch(error => console.error("❌ API Error:", error))
        .finally(() => {
            setLoading(false); // İstek tamamlandığında yüklemeyi durdur
        });
};


export const { getTours, getTour } = tourSlice.actions;
export default tourSlice.reducer;