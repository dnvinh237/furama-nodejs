import express from "express";
import authRouter from "./src/modules/auth/route";
import contractRoute from "./src/modules/contract/routes";
import contractDetailRoute from "./src/modules/contractDetail/routes";
import customerRoute from './src/modules/customer/routes'
import employeeRoute from "./src/modules/employee/routes";
import serviceRoute from "./src/modules/service/routes";


const router = express.Router();

router.use('/customer', customerRoute)
router.use('/employee', employeeRoute)
router.use('/service', serviceRoute)
router.use('/contract', contractRoute)
router.use('/contractDetail', contractDetailRoute)
router.use('/',authRouter)
export default router;
