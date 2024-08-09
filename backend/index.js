const express = require('express');
const app = express();
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb+srv://gguhui:miijij@cluster0.ckeb2is.mongodb.net/ZomatoMern?retryWrites=true&w=majority', { useNewUrlParser: true });
    console.log("data base connected");
    const fetchedData = await mongoose.connection.db.collection("food_items");
    const fetchedCategory = await mongoose.connection.db.collection("food_category");
    let category = await fetchedCategory.find({}).toArray();
    let data = await fetchedData.find({}).toArray();
    if (data && category) {
        global.food_items = data;
        global.food_category = category;
    }
};
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://gofoodd.netlify.app");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})
app.use('/zom', require('./routes/displaydata'));
app.use('/zom',require('./routes/createuser'));
app.use('/zom',require('./routes/orderData'));
app.listen(5000, () => {
    console.log("running");
})
