import { Router } from "express";
import {
  getCurrentUser,
  signin,
  signout,
  signup,
  updateUserDetails,
} from "../controllers/auth";
import { protect } from "../middlewares/auth";
import { validateRequest } from "../middlewares/validate-request";
import {
  signinValidator,
  signupValidator,
  updateUserValidator,
} from "../validator/user.validator";

const router = Router();

router.post("/signup", signupValidator, validateRequest, signup);
router.post("/signin", signinValidator, validateRequest, signin);
router.post("/signout", protect, signout);
router.put(
  "/updatedetails",
  protect,
  updateUserValidator,
  validateRequest,
  updateUserDetails
);
router.get("/user", protect, getCurrentUser);

export { router as authRoutes };
