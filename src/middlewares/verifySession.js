import { sessionMiddleware } from "./sessionMiddleware.js";

export const verifyLogin = async (req, res, next) => {
  try {
    sessionMiddleware(req, res, async () => {
      if (!req.session.user) {
        next();
      } else {
        res.status(401).json({ message: 'Usuário já está logado!' });
      }
    });
  } catch (error) {
    console.error('Erro ao verificar sessão:', error);
    res.status(500).json({ message: 'Erro interno ao verificar sessão!' });
  }
};