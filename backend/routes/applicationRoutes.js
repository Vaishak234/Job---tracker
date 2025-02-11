import express from 'express'
import {createApplicationController, deleteApplicationController, getApplicationController, updateApplicationController} from '../controllers/applicationController.js'
import verifyAuthToken from '../middlewares/verifyAuthentication.js';

const router =  express.Router()

router.use(verifyAuthToken)

// Adding a new job application (POST /api/applications)
router.post('/',createApplicationController);

router.get('/',getApplicationController);


router.put('/:id',updateApplicationController);

router.delete('/:id',deleteApplicationController);



export default router