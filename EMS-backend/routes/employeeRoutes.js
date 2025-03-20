const express = require('express')
const router = express.Router()
const {body} = require('express-validator')
const employeeController = require('../controller/employeeController')
const authMiddlewares = require('../middlewares/authMiddlewares')
const upload = require('../middlewares/multer')

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullName.firstName').isLength({min:3}).withMessage('First name must be at least 3 character long'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 character long')
], employeeController.registerEmployee)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 character long')
],employeeController.loginEmployee)

router.get('/profile', authMiddlewares.authEmployee, employeeController.getEmployee )
router.get('/logout', authMiddlewares.authEmployee , employeeController.logoutEmployee)
router.post('/update-profile',upload.single('image'),authMiddlewares.authEmployee, employeeController.updateProfile)
router.post('/accept-task', authMiddlewares.authEmployee , employeeController.acceptTask)
router.post('/task-completed', authMiddlewares.authEmployee , employeeController.markTaskCompleted)
router.post('/task-failed', authMiddlewares.authEmployee , employeeController.markTaskFailed)
router.get('/employee-dashboard', authMiddlewares.authEmployee , employeeController.employeeDashboard)

module.exports = router; 