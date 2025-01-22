import asyncHandler from 'express-async-handler';
import {applicationSchema} from '../validations/applicationSchema.js';
import ApplicationModel from '../models/applicationModel.js'
import mongoose from 'mongoose';
import { createApplication, deleteApplication, getApplications } from '../services/applicationService.js';


export const createApplicationController = asyncHandler(async (req, res) => {

    
        console.log(req.body);
    // validating the data using joi validation
    const { error } = applicationSchema.validate(req.body)
    console.log(error);
    

    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }

    const userId = new mongoose.Types.ObjectId(req.userId)

    const data = {
        userId,
        ...req.body
    }

     const newApplication = await createApplication(data)

    if(!newApplication) return res.status(400).json({ message: 'error in creating application' , success:false})

    res.status(201).json({ message: 'application created successfully', success: true, data:newApplication });
});


export const getAllApplicationController = asyncHandler(async (req, res) => {

     const userId = new mongoose.Types.ObjectId(req.userId)

     if(!userId) return res.status(400).json({ message: 'user not found', success:false})

     const allApplication = await getApplications(userId)
   
      if(!allApplication) return res.status(400).json({ message: 'error in fetching application' , success:false})

    res.status(201).json({ message: 'applications fetched successfully', success: true ,data:allApplication });
});



export const updateApplicationController = asyncHandler(async (req, res) => {

    // validating the data using joi validation
    // const { error } = applicationSchema.validate(req.body)
    const id =  new mongoose.Types.ObjectId(req.params.id)
    const userId = new mongoose.Types.ObjectId(req.userId)

    if(!userId || !id) return res.status(400).json({ message: 'access no valid', success:false})

    const data = {
        userId,
        ...req.body
    }

    const newApplication = await ApplicationModel.updateOne({_id:id},data)

    if(!newApplication) return res.status(400).json({ message: 'error in creating application' , success:false})

     
     res.status(201).json({ message: 'application updated successfully', success: true ,data:data });
});


export const deleteApplicationController = asyncHandler(async (req, res) => {

    // validating the data using joi validation
    const id =  new mongoose.Types.ObjectId(req.params.id)
    const userId = new mongoose.Types.ObjectId(req.userId)

    if(!userId || !id) return res.status(400).json({ message: 'access no valid', success:false})


    const application = await deleteApplication(id)

    if(!application) return res.status(400).json({ message: 'error in deleting application' , success:false})

    
    res.status(201).json({ message: 'application deleted successfully', success: true ,data:id });

});
