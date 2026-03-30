import express from "express";
import { Item } from "../models/Item.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const item = new Item({
    name: req.body.name,
    quantity: req.body.quantity,
    category: req.body.category,
  });

  try {
    const savedItem = await item.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { quantity } = req.body;

    if (quantity === undefined) {
      return res.status(400).json({ message: "Quantity is required" });
    }

    const parsedQuantity = Number(quantity);
    if (!Number.isFinite(parsedQuantity) || parsedQuantity <= 0) {
      return res.status(400).json({ message: "Quantity must be a number greater than 0" });
    }

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { quantity: parsedQuantity },
      { new: true, runValidators: true },
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json({ message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/", async (req, res) => {
  try {
    await Item.deleteMany({});
    res.json({ message: "All items deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
