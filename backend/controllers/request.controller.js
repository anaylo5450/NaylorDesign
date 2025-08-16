import mongoose from "mongoose";
import express from "express";
import Request from "../models/request.model.js";

export const submitRequest = async (req, res) => {
  const { email, description } = req.body;

  if (!email || !description) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide email and description." });
  }

  const newRequest = new Request({ email, description });

  try {
    await newRequest.save();
    res.status(201).json({ success: true, data: newRequest });
  } catch (error) {
    console.error("Error submitting request:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
