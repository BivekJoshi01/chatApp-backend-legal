import express from "express";
import { getThirdPartyUserData } from "../controllers/thirdParty.controller.js";

const router = express.Router();

router.get("user/getbyid/:userId", getThirdPartyUserData);

export default router;
