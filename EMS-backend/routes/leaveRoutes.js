// routes/leaveRoutes.js
const express = require('express');
const router = express.Router();
const leaveController = require('../controller/leaveController');
const authMiddlewares = require('../middlewares/authMiddlewares')


// Employee routes:
router.post('/apply-leave',authMiddlewares.authEmployee, leaveController.applyLeave);  
router.get('/getEmployeeLeaveData',authMiddlewares.authEmployee,leaveController.getEmployeeLeaveData)

// Admin routes:
router.get('/getLeaveData',authMiddlewares.authAdmin,leaveController.getLeaveData)
router.post('/approved-request',authMiddlewares.authAdmin,leaveController.approvedLeaveRequest)
router.post('/cancel-request',authMiddlewares.authAdmin,leaveController.rejectLeaveRequest)

module.exports = router;
