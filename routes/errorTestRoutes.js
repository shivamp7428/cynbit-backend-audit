import express from "express";
import asyncHandler from "../utils/asyncHandler.js";

const router = express.Router();

router.get(
    "/test-error",
    asyncHandler(async (req, res) => {
        throw new Error("Something went wrong");
    })
);

export default router;
