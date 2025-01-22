import mongoose from "mongoose";
import Joi from 'joi';

const applicationSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required'],
    },
    company: {
        type: String,
        required: [true, 'Company name is required'],
    },
    position: {
        type: String,
        required: [true, 'Position is required'],
    },
    dateApplied: {
        type: Date,
        required: [true, 'Date applied is required'],
    },
    status: {
        type: String,
        enum: ['applied', 'interviewing', 'selected', 'rejected'],
        required: true,
        default: 'applied'
    },
    notes: {
        type: String,
    },

}, { timestamps: true });

const ApplicationModel = mongoose.model("Application", applicationSchema);

export default ApplicationModel;
