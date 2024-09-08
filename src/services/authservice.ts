import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

export async function comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

export function generateToken(userId: string): string {
  const secretKey = process.env.JWT_SECRET as string;
  return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
}

export function verifyToken(token: string): string | null {
  const secretKey = process.env.JWT_SECRET as string;
  try {
    const decoded = jwt.verify(token, secretKey) as { userId: string };
    return decoded.userId;
  } catch (error) {
    return null;
  }
}
