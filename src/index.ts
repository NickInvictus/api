import express from "express";
import bodyParser from "body-parser";
import { Car } from "../schema/schema";
import { connectDB } from "../lib/db";
const app = express();
const PORT = 8083;
connectDB();
app.use(bodyParser.json());
//test change
app.get("/inventory", async (req, res) => {
  try {
    const cars = await Car.find();

    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/inventory/:brand/:model/:price/:year", async (req, res) => {
  try {
    const newCar = new Car({
      brand: req.params.brand,
      model: req.params.model,
      price: Number(req.params.price),
      year: Number(req.params.year),
    });

    await newCar.save();

    res.status(201).json(newCar);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.delete("/cars/:id", async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);

    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.json({ message: `Car with ID ${req.params.id} deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/inventory/brand/:brand", async (req, res) => {
  try {
    const car = await Car.findOne({ brand: req.params.brand });

    if (!car) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(car);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/inventory/model/:model", async (req, res) => {
  try {
    const car = await Car.findOne({ brand: req.params.model });

    if (!car) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(car);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/inventory/model/:year", async (req, res) => {
  try {
    const car = await Car.findOne({ brand: req.params.year });

    if (!car) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(car);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/inventory/total-value", async (req, res) => {
  try {
    const cars = await Car.find();
    let totalValue = 0;

    for (const car of cars) {
      totalValue += car.price!;
    }

    res.json({ totalValue });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
