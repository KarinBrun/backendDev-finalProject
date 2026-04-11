const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// Initialize database connection
const db = new Sequelize({
    dialect: process.env.DB_TYPE,
    storage: `database/${process.env.DB_NAME}` || 'database/vetclinic.db',
    logging: false
});

// User Model
// const User = db.define('User', {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     role: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         defaultValue: "employee",
//         validate: {
//             isIn: [['employee', 'manager', 'admin']]
//         }
//     }
// });

// Pets Model
const Pets = db.define('Pets', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ownerName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    species: {
        type: DataTypes.STRING,
        allowNull: false
    },
    breed: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.STRING,
        allowNull: false
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Visits Model
const Visits = db.define('Visits', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    visitDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    initialReason: {
        type: DataTypes.STRING,
        allowNull: false
    },
    symptoms: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    diagnosis: {
        type: DataTypes.STRING,
        allowNull: false
    },
    priority: {
        type: DataTypes.STRING,
        defaultValue: 'low'
    }
});

// Treatments Model
const Treatments = db.define('Treatments', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    issue: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    instructions: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

// Define Relationships
Pets.hasMany(Visits, { foreignKey: 'petsId' });
Visits.belongsTo(Pets, { foreignKey: 'petsId' });

Visits.hasMany(Treatments, { foreignKey: 'visitsId' });
Treatments.belongsTo(Visits, { foreignKey: 'visitsId' });

// User.hasMany(Task, { foreignKey: 'assignedUserId', as: 'assignedTasks' });
// Task.belongsTo(User, { foreignKey: 'assignedUserId', as: 'assignedUser' });

// Initialize database
async function initializeDatabase() {
    try {
        await db.authenticate();
        console.log('Database connection established successfully.');
        
        await db.sync({ force: false });
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to database:', error);
    }
}

initializeDatabase();

module.exports = {
    db,
    Pets,
    Visits,
    Treatments
};