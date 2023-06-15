const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Route = require('./routes/auth');
const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://admin:admin123@lern-mern.sakad8r.mongodb.net/?retryWrites=true&w=majority`, {
            // useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false
        });
        console.log('Connected DB......');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}
connectDB();
const PORT = 5000;
app.listen(PORT, () => {
    console.log("Server is running");
})



app.use('/api/auth', Route);


