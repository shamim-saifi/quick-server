import  Express  from "express";
import { Contact, ForgetPassword, GetFormData, Login, Logout, ResetPassword, Signup } from "../controllers/userControllers.js";
import authentication from "../middleware/authentication.js";


const router=Express.Router(); 

router.post('/signup',Signup)
router.post('/login',Login)
router.get('/logout',Logout) 
router.post('/forgetpassword',ForgetPassword)

router.get('/userform', authentication, GetFormData)

router.post('/contact',Contact)

router.put('/resetpassword/:token',ResetPassword)

export default router;
