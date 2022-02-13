import jwt from 'jsonwebtoken';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const secret: any = process.env.JWT_SECRET;

export default function generateJwtToken(userId: number) {
  const payload = {
    user: {
      id: userId,
    },
  };

  return jwt.sign(payload, secret, { expiresIn: 3600 });
}
