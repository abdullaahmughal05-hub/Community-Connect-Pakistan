import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { protectAdmin, AuthRequest } from "../middleware/authMiddleware";

const router = Router();

// Admin Login
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const passwordHash = process.env.ADMIN_PASSWORD_HASH;
    const jwtSecret = process.env.JWT_SECRET;

    if (!adminEmail || !passwordHash || !jwtSecret) {
      return res.status(500).json({
        success: false,
        message: "Authentication configuration is incomplete.",
      });
    }

    if (email.toLowerCase().trim() !== adminEmail.toLowerCase().trim()) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      { email: adminEmail },
      jwtSecret,
      {
        expiresIn: (process.env.JWT_EXPIRES_IN ||
          "1h") as jwt.SignOptions["expiresIn"],
      }
    );

    return res.status(200).json({
      success: true,
      message: "Admin login successful.",
      token,
      admin: {
        email: adminEmail,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong during login.",
    });
  }
});

// Verify current admin token
router.get("/me", protectAdmin, (req: AuthRequest, res: Response) => {
  return res.status(200).json({
    success: true,
    admin: req.admin,
  });
});

export default router;