import jwt from 'jsonwebtoken';

async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ state: false, message: 'Email y password son obligatorios' });
        }

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;
        const jwtSecret = process.env.JWT_SECRET;

        if (!adminEmail || !adminPassword || !jwtSecret) {
            return res.status(500).json({
                state: false,
                message: 'Faltan variables de entorno para autenticacion (ADMIN_EMAIL, ADMIN_PASSWORD, JWT_SECRET)'
            });
        }

        if (email !== adminEmail || password !== adminPassword) {
            return res.status(401).json({ state: false, message: 'Credenciales invalidas' });
        }

        const payload = {
            id: 'admin-local',
            email: adminEmail,
            rol: 'admin'
        };

        const token = jwt.sign(payload, jwtSecret, { expiresIn: process.env.JWT_EXPIRES_IN || '8h' });

        return res.status(200).json({
            state: true,
            message: 'Autenticacion exitosa',
            data: {
                token,
                tokenType: 'Bearer',
                user: payload
            }
        });
    } catch (error) {
        return res.status(500).json({ state: false, message: error.message });
    }
}

export { login };