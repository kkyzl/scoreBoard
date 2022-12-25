import { Router } from "express";
import ScoreCardRouter from "./scoreCard.js";
// define Express/Router middleware, API endpoint connected to front-end
const router = Router();
router.use("/", ScoreCardRouter);
export default router;
