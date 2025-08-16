import { Product } from "../models/product.model.js";

export const createProduct = async (req, res) => {
  try {
    // Expect fields: image (1), model (1)
    const image = req?.files?.image?.[0] ?? null;
    const cad   = req?.files?.model?.[0] ?? null;

    const product = new Product({
      name: req.body.name,
      description: req.body.description || "",
      price: Number(req.body.price) || 0,
      year: req.body.year || "",
      make: req.body.make || "",
      carModel: req.body.carModel || "",

      imageFile: image
        ? {
            filename: image.filename,
            path: image.path,
            size: image.size,
            mimetype: image.mimetype,
          }
        : null,
      cadFile: cad
        ? {
            filename: cad.filename,
            path: cad.path,
            size: cad.size,
            mimetype: cad.mimetype,
          }
        : null,
    });

    const saved = await product.save();
    res.status(201).json({ ok: true, data: saved });
  } catch (err) {
    console.error("createProduct error:", err);
    res.status(500).json({ ok: false, message: err?.message || "Server error." });
  }
};

//for the browse page
export const getProducts = async (req, res) => {
  try {
    const limit = Math.min(
      Math.max(parseInt(req.query.limit, 10) || 24, 1),
      100
    );

    const products = await Product.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    res.json({ ok: true, data: products });
  } catch (err) {
    console.error("getProducts error:", err);
    res
      .status(500)
      .json({ ok: false, message: err?.message || "Server error" });
  }
};

//get the product you click on in the browse parts or search page.
export const getProduct = async (req, res) => {
  try {
    const item = await Product.findById(req.params.id).lean();
    if (!item) return res.status(404).json({ ok: false, message: "Not found" });
    res.json({ ok: true, data: item });
  } catch (err) {
    console.error("getProduct error:", err);
    res.status(500).json({ ok: false, message: err.message || "Server error" });
  }
};
export const searchProducts = async (req, res) => {
  try {
    const q = req.query.q?.trim();
    if (!q) {
      return res.json({ ok: true, data: [] });
    }

    // Case-insensitive search on name, description, make, model
    const regex = new RegExp(q, "i");

    const products = await Product.find({
      $or: [
        { name: regex },
        { description: regex },
        { make: regex },
        { carModel: regex },
        { model: regex },
        { year: regex }
      ]
    }).limit(parseInt(req.query.limit) || 48);

    res.json({ ok: true, data: products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: err.message });
  }
};


