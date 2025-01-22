import { createSlice } from "@reduxjs/toolkit"
import { createApplication, deleteApplication, getAllApplications, updateApplication } from "./applicationActions"



const initialState = {
    applications: [],
    status: 'idle',
    error: null,
}

const applicationSlice = createSlice({
    name: "applications",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
                  .addCase(getAllApplications.pending, (state) => {
                      state.status = "loading"
                      state.error = null
                  })
                  .addCase(getAllApplications.fulfilled, (state,action) => {
                      
                      state.applications = action.payload.data
                      state.status = "success"
                      state.error = null
                  })
                  .addCase(getAllApplications.rejected, (state, action) => {
                      
                      state.status = "failed"
                      state.error = action?.payload.error || action?.payload.message 
                      
                  })
                  .addCase(createApplication.fulfilled, (state,action) => {
                     state.applications.push(action.payload.data)
                      state.status = "success"
                      state.error = null
                  })
                  .addCase(deleteApplication.fulfilled, (state, action) => {
                                         
                      state.applications = state.applications.filter(item => item._id !== action.payload)
                      state.status = "success"
                      state.error = null
                  })
                  
                  .addCase(updateApplication.fulfilled, (state, action) => {
                                         
                      const index = state.applications.findIndex(item => item._id === action.payload?.data._id)

                      state.applications[index] = action.payload?.data
                      
                      state.status = "success"
                      state.error = null
                  })
                  
         
           
    }
})


export const selectApplications = state => state.applications.applications



export default applicationSlice.reducer