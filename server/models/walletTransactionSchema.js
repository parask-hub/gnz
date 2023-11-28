const mongoose = require("mongoose");

const walletTransactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String, // "credit" or "debit"
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const WalletTransaction = mongoose.model(
  "WalletTransaction",
  walletTransactionSchema
);

module.exports = WalletTransaction;
