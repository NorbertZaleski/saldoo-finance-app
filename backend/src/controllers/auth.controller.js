// backend/src/controllers/auth.controller.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.model.js';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Sprawdź czy email i hasło są podane
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Podaj email i hasło'
            });
        }

        // 2. Znajdź użytkownika po email (z hasłem)
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Nieprawidłowy email lub hasło'
            });
        }

        // 3. Sprawdź czy konto jest aktywne
        if (!user.isActive) {
            return res.status(403).json({
                success: false,
                message: 'Konto jest nieaktywne'
            });
        }

        // 4. Porównaj hasło
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Nieprawidłowy email lub hasło'
            });
        }

        // 5. Generuj JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // 6. Aktualizuj ostatnie logowanie
        user.lastLogin = new Date();
        await user.save();

        // 7. Zwróć odpowiedź (bez hasła)
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        res.status(200).json({
            success: true,
            token,
            user: userWithoutPassword
        });
    } catch (error) {
        console.log("Error in login controller:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Brak wymaganych pól: name, email, password'
            });
        }

        // Sprawdź czy użytkownik już istnieje
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Użytkownik o tym emailu już istnieje'
            });
        }

        // Hashuj hasło
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Utwórz użytkownika
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // Generuj token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.log("Error in register controller:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};