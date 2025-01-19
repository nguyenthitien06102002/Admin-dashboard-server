import express from 'express';
import { getAllEmp, addEmp, loginUser } from '../controller/userController.js';
import { authenticateJWT, authorizeRole } from '../jwt/jsonwebtoken.js';
import { addProgress, addTodoList, getAllProgress } from '../controller/todoListController.js';

const router = express.Router();

router.get("/getAll", authenticateJWT, getAllEmp);
router.post("/addEmp", authenticateJWT, addEmp);
router.post("/api/login", loginUser);
router.post("/addProgress", authenticateJWT, addProgress); 
router.get("/api/getAllProgress", authenticateJWT, getAllProgress);
router.post("/addTodoList", authenticateJWT, authorizeRole(1), addTodoList);




export default router;