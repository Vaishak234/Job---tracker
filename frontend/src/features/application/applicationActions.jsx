import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../axios/axiosPrivate";



export const createApplication = createAsyncThunk('applications/createApplication', async (applicationData, thunkAPI) => {
    try {
        const response = await axiosPrivate.post('/applications', applicationData);
         console.log(response);
         
        return response?.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
})


export const getAllApplications = createAsyncThunk('applications/getAllApplications', async (_, thunkAPI) => {
    try {
        const response = await axiosPrivate.get('/applications');
   
        return response?.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
})

export const updateApplication = createAsyncThunk('applications/updateApplication', async (applicationData, thunkAPI) => {
    try {

        const id = applicationData?._id

        const response = await axiosPrivate.put('/applications/'+id,applicationData);
   
        return response?.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
})


export const deleteApplication = createAsyncThunk('applications/deleteApplication', async (id, thunkAPI) => {
    try {
        const response = await axiosPrivate.delete('/applications/'+id);
   
        return response.data?.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
})