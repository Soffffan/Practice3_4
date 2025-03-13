const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../admin")));

const getData = () => JSON.parse(fs.readFileSync("../server-client/data.json", "utf8"));
const saveData = (data) => fs.writeFileSync("../server-client/data.json", JSON.stringify(data, null, 2));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../admin/index.html"));
});

app.get("/products", (req, res) => res.json(getData()));

app.post("/products", (req, res) => {
    let products = getData();
    const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;
    const newProduct = { id: newId, ...req.body };
    products.push(newProduct);
    saveData(products);
    res.json(newProduct);
});

app.put("/products/:id", (req, res) => {
    let products = getData();
    products = products.map(p => (p.id == req.params.id ? { ...p, ...req.body } : p));
    saveData(products);
    res.json({ message: "Updated" });
});

app.delete("/products/:id", (req, res) => {
    let products = getData();
    products = products.filter(p => p.id != req.params.id);
    products = products.map((p, index) => ({ ...p, id: index + 1 })); // Пересортировка ID
    saveData(products);
    res.json({ message: "Deleted" });
});

app.listen(8080, () => console.log("Admin server running at http://localhost:8080"));
