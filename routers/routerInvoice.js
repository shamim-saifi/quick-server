import  Express  from "express";
import authentication from "../middleware/authentication.js";
import { CreateInvoiceData, DeleteInvoiceData, GetAllInvoiceData } from "../controllers/InvoiceControllers.js";


const router=Express.Router();


router.post('/createinvoice', authentication, CreateInvoiceData)
router.get('/getallinvoicedata', authentication, GetAllInvoiceData)
router.delete('/deleteinvoicedata/:id', authentication, DeleteInvoiceData) 

export default router;
