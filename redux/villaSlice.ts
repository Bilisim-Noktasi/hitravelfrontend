import { getRequest } from "@/service/requestService";
import { VillaState } from "@/types";
import { createSlice, Dispatch } from "@reduxjs/toolkit";

const initialState: VillaState = {
    villas: [],
    villa: undefined
};

const villaSlice = createSlice({
    name: "villa",
    initialState,
    reducers: {
        getVillas: (state, action) => {
            state.villas = action.payload;
        },
        getVilla: (state, action) => {
            state.villa = action.payload;
        }
    }
});

// ✅ Tüm villaları getir
export const getVillasDispatch = () => async (dispatch: Dispatch) => {
    try {
        const res = await getRequest({ url: "https://www.villareyonu.com/api/transfer/3022025-144721" });

        if (res?.data?.items) {
            dispatch(getVillas(res.data.items));
        } else {
            console.warn("⚠️ Beklenen villa verisi alınamadı:", res);
        }
    } catch (error) {
        console.error("❌ Villa API Hatası:", error);
    }
};

// ✅ Belirli bir villayı getir
export const getVillaDispatch = (villaId: string, setLoading: (value: boolean) => void) => async (dispatch: Dispatch) => {
    try {
        const res = await getRequest({ url: `https://www.villareyonu.com/api/transfer/3022025-144721` });

        if (res?.data) {
            dispatch(getVilla(res.data));
        } else {
            console.warn(`⚠️ Villa ID ${villaId} için veri bulunamadı.`);
        }
    } catch (error) {
        console.error(`❌ Villa ID ${villaId} API Hatası:`, error);
    } finally {
        setLoading(false);
    }
};

export const { getVilla, getVillas } = villaSlice.actions;

export default villaSlice.reducer;
