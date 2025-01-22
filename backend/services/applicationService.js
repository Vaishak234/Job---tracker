import ApplicationModel from "../models/applicationModel.js";


export const createApplication = async (data) => {
    try {
        const newApplication = await ApplicationModel.create(data)

        return newApplication;
    } catch (error) {
        console.log('error in creating user', error);

    }
}



export const getApplications = async (userId, status) => {
    try {
        const query = { userId: userId };
        if (status) {
            query.status = status;
        }
        const applications = await ApplicationModel.find(query);

        return applications;
    } catch (error) {
        console.log('error in fetching applications', error);
    }
}



export const deleteApplication = async (id) => {
    try {
        const application = await ApplicationModel.deleteOne({_id:id})

        return application;
    } catch (error) {
        console.log('error in creating user', error);

    }
}

