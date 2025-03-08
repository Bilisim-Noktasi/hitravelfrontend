// import { createSlice, Dispatch } from "@reduxjs/toolkit";
// import { Admin } from "@/types/admin";
// import { postMultipartRequest, postRequest } from "@/service/requestService";

// const initialState: Admin = {
//     tours: [],
//     tour: null
// }

// const adminSlice = createSlice({
//     name: 'admin',
//     initialState,
//     reducers: {
//         getTours: (state,action) => {
//             state.tours = action.payload
//         },
//         getTour: (state,action) => {
//             state.tour = action.payload
//         }
//     }
// })

// export const createTourDispatch = (tourData: object,loading:(value:boolean) => void) => async(dispatch:Dispatch) => {
//     postMultipartRequest({controller:'admin',action:'create-tour'},tourData).then(res=> {
//         loading(true)
//         alert(res.data.message)
//     }).finally(()=> {
//         loading(false)
//     })
// }


// export const { getTours, getTour } = adminSlice.actions

// export default adminSlice.reducer;