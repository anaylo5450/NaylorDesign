import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    filename: String,
    path: String,
    size: Number,
    mimetype: String,
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, default: "", maxlength: 5000 },
    price: { type: Number, default: 0 },
    year: { type: String, default: "" },
    make: { type: String, default: "" },
    carModel: { type: String, default: "" },

    imageFile: fileSchema, // image metadata
    cadFile: fileSchema,   // STL or STEP metadata
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
