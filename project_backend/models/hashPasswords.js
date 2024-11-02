const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/projecttitle', { useNewUrlParser: true, useUnifiedTopology: true });

// Define the schema and model (use the same schema as in your application)
const loginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const Login = mongoose.model('Login', loginSchema);

async function hashPasswords() {
    try {
        const users = await Login.find();

        for (const user of users) {
            if (!user.password.startsWith('$2b$')) { // Check if password is already hashed
                const hashedPassword = await bcrypt.hash(user.password, 10);
                user.password = hashedPassword;
                await user.save();
                console.log(`Updated password for ${user.email}`);
            }
        }

        console.log('All passwords have been hashed.');
    } catch (err) {
        console.error('Error:', err);
    } finally {
        mongoose.connection.close();
    }
}

hashPasswords();
