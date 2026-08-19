// backend/src/middleware/auth.middleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

/**
 * Middleware autoryzacji sprawdza token i dodaje użytkownika do req
 */
export const protect = async (req, res, next) => {
    try {
        let token;

        // 1. Pobierz token z nagłówka
        if (req.headers.authorization?.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Brak autoryzacji – zaloguj się'
            });
        }

        // 2. Zweryfikuj token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. ZNAJDŹ UŻYTKOWNIKA (sprawdzenie czy istnieje)
        const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Użytkownik nie istnieje'
            });
        }

        // 4. DODAJ UŻYTKOWNIKA DO REQ
        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Nieprawidłowy token'
            });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token wygasł zaloguj się ponownie'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Błąd autoryzacji'
        });
    }
};

