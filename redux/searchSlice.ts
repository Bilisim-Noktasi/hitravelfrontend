import { getRequest } from "@/service/requestService";
import { SearchCity, SearchCountry, SearchState } from "@/types";
import { createSlice, Dispatch } from "@reduxjs/toolkit";

interface InitialProps {
    countries: SearchCountry[]
    cities: SearchCity[],
    states: SearchState[]
}

const initialState: InitialProps = {
    countries: [],
    cities: [],
    states: []
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        getCountries: (state,action) => {
            state.countries = action.payload
        },
        getCities: (state,action) => {
            state.cities = action.payload;
        },
        getStates: (state,action) => {
            state.states = action.payload;
        }
    }
})

export const getCountriesDispatch = () => async(dispatch:Dispatch) => {
    getRequest({controller:'search',action:'get-countries'}).then(res=> {
        dispatch(getCountries(res?.data))
    })
}

export const getCitiesByCountryIdDispatch = (id:number) => async(dispatch:Dispatch) => {
    getRequest({controller:'search',action:'get-city-by-countryId',params:{countryId:id}}).then(res=> {
        dispatch(getCities(res?.data))
    })
}

export const getStatesDispatch = (id:number) => async(dispatch:Dispatch) => {
    getRequest({ controller:'search', action:'get-state-by-cityId', params:{cityId:id} }).then(res=> {
        dispatch(getStates(res?.data))
    })
}

export const { getCountries, getCities, getStates } = searchSlice.actions;

export default searchSlice.reducer;