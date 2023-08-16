import express from 'express';
import {registerUser,loginUser, getUser,getUsers ,addUser,/*createuser*/ updateuser, deleteuser, upload, contact} from '../controller/user.js';

const router = express.Router();
import { protect } from '../middleware/authmiddleware.js';
router.post("/contact", contact);

router.get('/:id', getUser);
/*router.post('/', createuser);*/
router.get('/', protect,getUsers);
router.put('/:id', updateuser);
router.delete('/:id', deleteuser);
router.post('/register',upload.single("imagePath"),registerUser);
router.post('/login',loginUser);
router.get('/trainers')
router.post("/addUser",addUser);

export default router;
