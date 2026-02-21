import { Request, Response } from 'express';
import * as AuthService from '../services/auth.service';
import * as UserRepo from '../repositories/user.repository';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await UserRepo.findUserByEmail(email);
    
    // Validasi password (logika disederhanakan)
    if (!user) return res.status(401).json({ message: "User not found" });

    const tokens = AuthService.generateTokens({ id: user.id, email: user.email });
    await UserRepo.updateRefreshToken(user.id, tokens.refreshToken);

    res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true, secure: true });
    res.json({ accessToken: tokens.accessToken });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};