const express = require('express')
const router = express.Router()
const {body} = require('express-validator')
const adminController = require('../controller/adminController')
const authMiddlewares = require('../middlewares/authMiddlewares')
const upload = require('../middlewares/multer')

router.post('/register', adminController.registerAdmin)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 character long')
], adminController.loginAdmin)

router.get('/logout' ,authMiddlewares.authAdmin, adminController.logoutAdmin)
router.get('/profile', authMiddlewares.authAdmin, adminController.getProfile )
router.post('/update-profile',upload.single('image'),authMiddlewares.authAdmin, adminController.updateProfile)
router.post('/delete-profile', authMiddlewares.authAdmin, adminController.deleteProfile)
router.get('/get-all-employees',authMiddlewares.authAdmin,adminController.getAllEmployee)
router.get('/get-specific-employee/:employeeId',authMiddlewares.authAdmin,  adminController.getSpecificEmployee)
router.post('/create-employee', authMiddlewares.authAdmin, upload.single('image'),adminController.createEmployee)
router.post('/update-employee-profile/:employeeId',upload.single('image'),authMiddlewares.authAdmin,adminController.updateEmployeeProfile)
router.post('/delete-employee/:employeeId',authMiddlewares.authAdmin,adminController.deleteEmployee)
router.put('/add-newTask',authMiddlewares.authAdmin, adminController.addNewTask)
router.put('/update-task', authMiddlewares.authAdmin,adminController.updateTask)
router.put('/delete-task', authMiddlewares.authAdmin,adminController.deleteTask)
router.get('/admin-dashboard', authMiddlewares.authAdmin, adminController.adminDashboard)
router.get('/filter-employees', authMiddlewares.authAdmin, adminController.filterEmployee)
router.get('/search-employees', authMiddlewares.authAdmin, adminController.searchEmployeesByName)
router.post('/add-new-department',authMiddlewares.authAdmin, adminController.addNewDepartment)
router.get('/get-departments-with-count', authMiddlewares.authAdmin, adminController.getDepartmentsWithEmployeeCount)
router.post('/delete-department',authMiddlewares.authAdmin, adminController.deleteDepartment)

module.exports = router