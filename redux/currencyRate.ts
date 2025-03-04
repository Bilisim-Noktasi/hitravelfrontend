import { getRequest } from "@/service/requestService";
import { createSlice, Dispatch } from "@reduxjs/toolkit";

interface CurrencyRate {
    currencyRates: Record<string,number>
}


const currencyRate = createSlice({
    name: 'currencyRate',
    initialState: {
        currencyRates: {} as Record<string, number>
    },
    reducers: {
        getRates: (state,action) => {
            state.currencyRates = action.payload;
        }
    }
})


export const getRatesDispatch = () => async(dispatch: Dispatch) => {
    getRequest({controller:'currency-rate',action:'get-rates'}).then(res=> {
        dispatch(getRates(res?.data[0].currencyRate))
    })
}

export const { getRates } = currencyRate.actions;
export default currencyRate.reducer;