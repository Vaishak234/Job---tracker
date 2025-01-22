import asyncHandler from 'express-async-handler';
import {applicationSchema} from '../validations/applicationSchema.js';
import ApplicationModel from '../models/applicationModel.js'
import mongoose from 'mongoose';
import { createApplication, deleteApplication, getApplications } from '../services/applicationService.js';


export const createApplicationController = asyncHandler(async (req, res) => {


    // validating the data using joi validation
    const { error } = applicationSchema.validate(req.body)    

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


export const getApplicationController = asyncHandler(async (req, res) => {
    const userId = new mongoose.Types.ObjectId(req.userId);
    const { query, status  } = req.query.query;

    const page = parseInt(req.query.query.page) || 1; 
    const limit = parseInt(req.query.query.limit) || 5; 

    const skip = (page - 1) * limit; 
 

    if (!userId) return res.status(400).json({ message: 'user not found', success: false });

    let searchCriteria = { userId };

    if (query) {
        searchCriteria.company = { $regex: query, $options: 'i' };
    }

    if (status) {
        searchCriteria.status = status;
    }
    

    const searchResults = await ApplicationModel.find(searchCriteria).limit(limit).skip(skip);

    console.log(searchResults.length);
    

    if (!searchResults) return res.status(400).json({ message: 'error in searching applications', success: false });

    res.status(200).json({ message: 'applications found successfully', success: true, data: searchResults });
});
