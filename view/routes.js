import express from 'express';
import { getAllEmp, addEmp, loginUser } from '../controller/userController.js';

const router = express.Router();

router.get("/getAll", getAllEmp);
router.post("/addEmp", addEmp);
router.post("/api/login", loginUser);




export default router;