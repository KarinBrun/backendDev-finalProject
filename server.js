const express = require('express');
const bcrypt = require('bcryptjs');
const { db, Pets, Visits, Treatments } = require('./database/setup');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// function requireAuth(req, res, next) {
//     // Extract token from Authorization header
//     const authHeader = req.headers.authorization;
    
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return res.status(401).json({ error: 'No token provided' });
//     }
    
//     // Get the token (remove 'Bearer ' prefix)
//     const token = authHeader.substring(7);
    
//     try {
//         // Verify and decode the token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
//         // User info is now available from the token
//         req.user = {
//             id: decoded.id,
//             username: decoded.username,
//             email: decoded.email,
//             role: decoded.role
//         };
        
//         next();
//     } catch (error) {
//         if (error.name === 'TokenExpiredError') {
//             return res.status(401).json({ error: 'Token expired' });
//         } else if (error.name === 'JsonWebTokenError') {
//             return res.status(401).json({ error: 'Invalid token' });
//         } else {
//             return res.status(401).json({ error: 'Token verification failed' });
//         }
//     }
// }

// Role-based middleware functions
// function requireManager(req, res, next) {
//     // Check if user is authenticated first
//     if (!req.user) {
//         return res.status(401).json({ error: 'Authentication required' });
//     }
    
//     // Check if user has manager or admin role
//     if (req.user.role === 'manager' || req.user.role === 'admin') {
//         next();
//     } else {
//         return res.status(403).json({ 
//             error: 'Access denied. Manager role required.' 
//         });
//     }
// }

// function requireAdmin(req, res, next) {
//     // Check if user is authenticated first
//     if (!req.user) {
//         return res.status(401).json({ error: 'Authentication required' });
//     }
    
//     // Check if user has admin role
//     if (req.user.role === 'admin') {
//         next();
//     } else {
//         return res.status(403).json({ 
//             error: 'Access denied. Admin role required.' 
//         });
//     }
// }

// Test database connection
async function testConnection() {
    try {
        await db.authenticate();
        console.log('Connection to database established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection();

module.exports = app;

// AUTHENTICATION ROUTES

// POST /api/register - Register new user
// app.post('/api/register', async (req, res) => {
//     try {
//         const { name, email, password } = req.body;
        
//         // Check if user exists
//         const existingUser = await User.findOne({ where: { email } });
//         if (existingUser) {
//             return res.status(400).json({ error: 'User with this email already exists' });
//         }
        
//         // Hash password
//         const hashedPassword = await bcrypt.hash(password, 10);
        
//         // Create user
//         const newUser = await User.create({
//             name,
//             email,
//             password: hashedPassword,
//             role
//         });
        
//         res.status(201).json({
//             message: 'User registered successfully',
//             user: {
//                 id: newUser.id,
//                 name: newUser.name,
//                 email: newUser.email
//             }
//         });
        
//     } catch (error) {
//         console.error('Error registering user:', error);
//         res.status(500).json({ error: 'Failed to register user' });
//     }
// });

// // POST /api/login - User login (TODO: Replace with JWT)
// app.post('/api/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;
        
//         const user = await User.findOne({ where: { email } });
//         if (!user) {
//             return res.status(401).json({ error: 'Invalid email or password' });
//         }
        
//         const isValidPassword = await bcrypt.compare(password, user.password);
//         if (!isValidPassword) {
//             return res.status(401).json({ error: 'Invalid email or password' });
//         }
        
//         // Create session
//         const token = jwt.sign( 
//             { 
//                 id: user.id, 
//                 username: user.username, 
//                 email: user.email,
//                 role:  user.role
//             }, 
//             process.env.JWT_SECRET, 
//             { expiresIn: process.env.JWT_EXPIRES_IN 
//         } 
//         ); 

//         res.json({ 
//             message: 'Login successful', 
//             token: token, 
//             user: { 
//                 id: user.id, 
//                 username: user.username, 
//                 email: user.email 
//             }
//         })
        
//     } catch (error) {
//         console.error('Error logging in user:', error);
//         res.status(500).json({ error: 'Failed to login' });
//     }
// });

// // POST /api/logout - User logout
// app.post('/api/logout', (req, res) => {
//     res.json({ message: 'Logout successful' });
// });


// PETS ROUTES

// GET /api/pets - Get all pets
app.get('/api/pets', async (req, res) => {
    try {
        const pets = await Pets.findAll();
        res.json(pets);
    } catch (error) {
        console.error('Error fetching pets:', error);
        res.status(500).json({ error: 'Failed to fetch pets' });
    }
});

// GET /api/pets/:id - Get single pet
app.get('/api/pets/:id', async (req, res) => {
    try {
        const pet = await Pets.findByPk(req.params.id, {
            include: [
                {
                    model: Visits,
                    attributes: ['id', 'visitDate', 'initialReason']
                }
            ]
        });
        
        if (!pet) {
            return res.status(404).json({ error: 'Pet not found' });
        }
        
        res.json(pet);
    } catch (error) {
        console.error('Error fetching pet:', error);
        res.status(500).json({ error: 'Failed to fetch pet' });
    }
});

// POST /api/pets - Create new pet
app.post('/api/pets', async (req, res) => {
    try {
        const { ownerName, name, species, breed, gender, age, color } = req.body;
        
        const newPet = await Pets.create({
            ownerName,
            name,
            species,
            breed,
            gender,
            age,
            color
        });
        
        res.status(201).json(newPet);
    } catch (error) {
        console.error('Error creating pet:', error);
        res.status(500).json({ error: 'Failed to create pet' });
    }
});

// PUT /api/pets/:id - Update pet
app.put('/api/pets/:id', async (req, res) => {
    try {
        const { ownerName, name, species, breed, gender, age, color } = req.body;
        
        const [updatedRowsCount] = await Pets.update(
            { ownerName, name, species, breed, gender, age, color },
            { where: { id: req.params.id } }
        );
        
        if (updatedRowsCount === 0) {
            return res.status(404).json({ error: 'Pet not found' });
        }
        
        const updatedPet = await Pets.findByPk(req.params.id);
        res.json(updatedPet);
    } catch (error) {
        console.error('Error updating pet:', error);
        res.status(500).json({ error: 'Failed to update pet' });
    }
});

// DELETE /api/pets/:id - Delete pet
app.delete('/api/pets/:id', async (req, res) => {
    try {
        const deletedRowsCount = await Pets.destroy({
            where: { id: req.params.id }
        });
        
        if (deletedRowsCount === 0) {
            return res.status(404).json({ error: 'Pet not found' });
        }
        
        res.json({ message: 'Pet deleted successfully' });
    } catch (error) {
        console.error('Error deleting pet:', error);
        res.status(500).json({ error: 'Failed to delete pet' });
    }
});

// Start server
if (require.main === module) {
    app.listen(port, () => {
         console.log(`API server running at http://localhost:${port}`);
    });
};