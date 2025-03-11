import { getRequest } from "@/service/requestService";
import { VillaState } from "@/types";
import { createSlice, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";

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
        const response = await axios.get('https://api.hitravel.com.tr/api/Villa');
        
        if (response?.data) {
            dispatch(getVillas(response.data));
        } else {
            console.warn("⚠️ Beklenen villa verisi alınamadı:", response);
        }
    } catch (error) {
        console.error("❌ Villa API Hatası:", error);
    }
};

// ✅ Belirli bir villayı getir
export const getVillaDispatch = (homeId: string, setLoading: (value: boolean) => void) => async (dispatch: Dispatch) => {
    try {
        const response = await axios.get(`https://api.hitravel.com.tr/api/Villa/detail/${homeId}`);
        
        if (response?.data) {
            // API'den gelen veriyi VillaDetail tipine uygun şekilde dönüştür
            const villaData = {
                ...response.data,
                // Eğer API'den gelen veri yapısı farklıysa, burada dönüşüm yapılabilir
                // Örneğin, API'den gelen 'images' alanı 'pictures' olarak da kullanılıyor
                pictures: response.data.images || [],
                // 'description' alanı 'icerik' olarak da kullanılıyor
                icerik: response.data.description || "",
                // 'capacity' alanı 'people' olarak da kullanılıyor
                people: response.data.capacity || 0
            };
            
            dispatch(getVilla(villaData));
        } else {
            console.warn(`⚠️ Villa ID ${homeId} için veri bulunamadı.`);
        }
    } catch (error) {
        console.error(`❌ Villa ID ${homeId} API Hatası:`, error);
    } finally {
        setLoading(false);
    }
};

export const { getVilla, getVillas } = villaSlice.actions;

export default villaSlice.reducer;
