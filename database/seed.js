const bcrypt = require('bcryptjs');
const { db, User, Pets, Visits, Treatments } = require('./setup');

async function seedDatabase() {
    try {
        // Force sync to reset database
        await db.sync({ force: true });
        console.log('Database reset successfully.');

        // Create sample users
        const hashedPassword = await bcrypt.hash('password123', 10);
        
        const users = await User.bulkCreate([
            {
                name: 'John Smith',
                email: 'john@vet.com',
                password: hashedPassword,
                role: 'vettech'
            },
            {
                name: 'Sarah Dole',
                email: 'sarah@vet.com',
                password: hashedPassword,
                role: 'vet'
            },
            {
                name: 'Mike Holt',
                email: 'mike@vet.com',
                password: hashedPassword,
                role: 'admin'
            }
        ]);

        // Create sample pets
        const pets = await Pets.bulkCreate([
            {
                ownerName: 'Bob',
                name: 'Fluffy',
                species: 'dog',
                breed: 'lab',
                gender: 'male',
                age: '6 years',
                color: 'black'
            },
            {
                ownerName: 'Jon Arbuckle',
                name: 'Garfield',
                species: 'cat',
                breed: 'dom shorthair',
                gender: 'male',
                age: '47 years',
                color: 'orange'
            },
            {
                ownerName: 'Jon Arbuckle',
                name: 'Odie',
                species: 'dog',
                breed: 'mutt',
                gender: 'male',
                age: '47 years',
                color: 'yellow'
            }
        ]);

        // Create sample visits
        const visits = await Visits.bulkCreate([
            {
                visitDate: Date.now,
                initialReason: 'Cut on paw',
                symptoms: 'Open wound on front left paw',
                diagnosis: 'Cut',
                petsId: pets[0].id
            },
            {
                visitDate: Date.now,
                initialReason: 'Cat sick',
                symptoms: 'Vomiting',
                diagnosis: 'Cat ate inappropriate food',
                priority: 'medium',
                petsId: pets[1].id
            },
            {
                visitDate: Date.now,
                initialReason: 'Limping',
                symptoms: 'Limping, pain',
                diagnosis: 'Bruised hind quarters',
                petsId: pets[2].id
            }
        ]);

        // Create sample treatments
        const treatments = await Treatments.bulkCreate([
            {
                issue: 'Cut on left front paw',
                description: 'Examined wound, cleaned wound, applied ointment, applied bandage',
                visitsId: visits[0].id,
                instructions: 'Apply ointment every 24 hours for 2 weeks. Keep bandaged if possible.'
            },
            {
                issue: 'Ate lasagna',
                description: 'Preliminary examination, xrays, anti-nausea medication, observation',
                visitsId: visits[1].id,
                instructions: 'Give anti-nausea medication orally every 12 hours for 1 week. Advised owner to feed cat appropriate diet.'
            },
            {
                issue: 'Bruied hind quarters',
                description: 'Examined hind quarters and legs, xrays',
                visitsId: visits[2].id,
                instructions: 'Give pain medication as needed, keep off tall objects for 4 weeks.'
            },
        ]);

        console.log('Database seeded successfully!');
        
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await db.close();
    }
}

seedDatabase();