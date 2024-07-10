if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const express = require('express');
const app = express();
app.use(express.json())
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const mongoose = require('mongoose');
const items = require("./models/item");
const { v4: uuidv4 } = require("uuid");
uuidv4();
app.use(cors({
    origin: ['https://agroclient-nine.vercel.app', 'http://localhost:3000']
}));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dburl = process.env.DB_URL;

// const dburl = 'mongodb://127.0.0.1:27017/agroAssignment'

mongoose.connect(dburl, {
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.get('/products', async (req, res) => {
    const { q } = req.query;
    const { l } = req.query;
    let products = [];
    try {
        if (q === "All") {
            products = await items.find({}).limit(l);
            res.json(products);
        }
        else {
            products = await items.find({ category: q });
            res.json(products);
        }
    } catch (e) {
        console.log(`e-->${e}`);
    }
})


app.post('/upload', async (req, res) => {
    const data = req.body;
    let item = new items();
    for (let img of data.images) {
        item.images.push(img);
    }
    item.name = data.Name;
    item.description = data.Description;
    item.price = data.price;
    item.category = data.category;
    item.brand = data.brand;
    await item.save();
    //console.log(item);
    res.json("upload successfull");
})

app.get('/edit/:id', async (req, res) => {
    const Id = req.params.id;
    try {
        const prod = await items.findById(Id);
        return res.json(prod);
    } catch (e) {
        console.log(`Error-->${e}`);
    }
})

app.patch('/edit/:id', async (req, res) => {
    const Id = req.params.id;
    const { Name, Description, price, category } = req.body;
    try {
        const oldProduct = await items.findById(Id);
        if (oldProduct.Name !== Name) {
            await items.updateOne({ _id: Id }, { name: Name })

        }
        if (oldProduct.description !== Description) {
            await items.updateOne({ _id: Id }, { description: Description })
        }
        if (oldProduct.price !== price) {
            await items.updateOne({ _id: Id }, { price: price })

        }
        if (oldProduct.category !== category) {
            await items.updateOne({ _id: Id }, { $set: { category: category } });
        }
        const newProduct = await items.findById(Id);
        res.json(newProduct)
    } catch (e) {
        console.log(`Error-->${e}`);
    }
})


app.listen(PORT, () => {
    console.log(`Listining at Port ${PORT}`);
})
