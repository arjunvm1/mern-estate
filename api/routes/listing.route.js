import  express  from 'express';
import { createListing, deleteListing, updateListing } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();


router.post('/create', verifyToken, createListing); //route for creating a listing
router.delete('/delete/:id',verifyToken, deleteListing) //route for deleting a listing
router.post('/update/:id', verifyToken, updateListing) //route for updating  a listing


export  default router;