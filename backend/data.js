// Assuming you have a MongoDB database setup with a collection named "accounts"

const mongoose = require('mongoose');

// Create a schema for the account
const accountSchema = new mongoose.Schema({
  accountNumber: String,
  // Other fields...
});

// Create a model based on the schema
const Account = mongoose.model('Account', accountSchema);

// Function to generate a custom series number
async function generateSeriesNumber() {
  try {
    // Find the latest account in the collection
    const latestAccount = await Account.findOne({}, {}, { sort: { accountNumber: -1 } });

    // Extract the series number from the latest account
    let seriesNumber = 1;
    if (latestAccount) {
      const latestAccountNumber = latestAccount.accountNumber;
      seriesNumber = parseInt(latestAccountNumber.split('-')[1]) + 1;
    }

    // Generate the new account number with the series number
    const newAccountNumber = `AC-${seriesNumber}`;

    return newAccountNumber;
  } catch (error) {
    console.error('Error generating series number:', error);
    throw error;
  }
}

// Create a new account with a custom series number
async function createAccount() {
  try {
    // Generate the series number
    const seriesNumber = await generateSeriesNumber();

    // Create a new account
    const newAccount = new Account({
      accountNumber: seriesNumber,
      // Other fields...
    });

    // Save the new account to the database
    const savedAccount = await newAccount.save();

    console.log('Account created with number:', savedAccount.accountNumber);
  } catch (error) {
    console.error('Error creating account:', error);
  }
}

// Connect to the MongoDB database
mongoose
  .connect('mongodb://localhost:27017/my-database', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');
    createAccount();
  })
  .catch((error) => console.error('Error connecting to the database:', error));
