const mongoose = require("mongoose");

const CalculatorSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: { type: String, enum: ["Calorie", "Macro", "One-Rep Max"], required: true },
    result: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Calculator", CalculatorSchema);
