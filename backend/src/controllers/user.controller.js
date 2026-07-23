import User from "../models/User.model.js";

export const getUser = async (req, res) => {
    try {
        const userId = req.params.id;
        
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'Brak ID użytkownika'
            });
        }

        const user = await User.findById(userId).select('-password');
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Użytkownik nie znaleziony'
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.log("Error in getUser controller", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
export const createuser = async(req,res) => {
    try {
        const {name, email, password} = req.body;
        const newUser = new User({name, email, password});
        await newUser.save();
        res.status(201).json({message: "User created successfully"})
    } catch (error) {
        console.log("Error in createUser controller", error);
        res.status(500).json({message: "Internal server error"});
    }
};