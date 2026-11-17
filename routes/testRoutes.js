
import express from "express";
import { z } from "zod";
import validateRequest from "../middleware/validateRequest.js";

const router = express.Router();

const userSchema = z.object({
    body: z.object({
        name: z.string().min(3),
        email: z.string().email(),
        age: z.number().int().min(18)
    })
});

router.post("/test-validation", validateRequest(userSchema), (req, res) => {
    res.status(201).json({
        success: true,
        message: "Validation successful",
        data: req.validatedData.body
    });
}
);

export default router;
