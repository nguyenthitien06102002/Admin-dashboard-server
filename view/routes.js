import express from 'express';
import { getAllEmp, addEmp, loginUser } from '../controller/userController.js';
import { authenticateJWT, authorizeRole } from '../jwt/jsonwebtoken.js';
import { addProgress, addTodoList, getAllProgress, getAllTodolist, updateTodoListActive } from '../controller/todoListController.js';
import { uploadImage } from '../controller/imageController.js';
import upload from '../middleware/upload.js';
import { addFulfillment, addItemOrder, addOrder, addOrderStatus, addPNGStatus, addTracking, getAllFulfillment, getAllItemOrder, getAllOrder, getAllOrderStatus, getAllPNGStatus, getAllTracking, updateOrderActive } from '../controller/orderController.js';



const router = express.Router();


router.get("/getAll", authenticateJWT, getAllEmp);
router.post("/addEmp", addEmp);
router.post("/api/login", loginUser);
router.post("/addProgress", authenticateJWT, addProgress); 
router.get("/api/getAllProgress", authenticateJWT, getAllProgress);
router.post("/addTodoList", authenticateJWT, authorizeRole(1), addTodoList);
router.post('/api/upload', upload.single('image'), (req, res, next) => {
	console.log('File nhận được:', req.file);
	if (!req.file) {
		return res.status(400).json({ message: 'Không có file nào được tải lên!' });
	}
	next();
}, uploadImage);
router.post("/addOrderStatus", authenticateJWT, authorizeRole(1), addOrderStatus);
router.get("/getOrderStatus", authenticateJWT, getAllOrderStatus);
router.post("/addFulfillment", authenticateJWT, authorizeRole(1), addFulfillment);
router.get("/getFulfillment", authenticateJWT, getAllFulfillment);
router.post("/addItemOrder", authenticateJWT, authorizeRole(1), addItemOrder);
router.get("/getItemOrder", authenticateJWT, getAllItemOrder);
router.post("/addTracking", authenticateJWT, authorizeRole(1), addTracking);
router.get("/getTracking", authenticateJWT, getAllTracking);
router.post("/addPNGStatus", authenticateJWT, authorizeRole(1), addPNGStatus);
router.get("/getPNGStatus", authenticateJWT, getAllPNGStatus);
router.post("/addOrder", authenticateJWT, addOrder);
router.get("/allListToDo", authenticateJWT, getAllTodolist);
router.get("/allOrder", authenticateJWT, getAllOrder);
router.put("/updateOrderActive/:orderId", authenticateJWT, updateOrderActive);
router.put("/updateTodoListActive/:todoListId", authenticateJWT, updateTodoListActive);
export default router;