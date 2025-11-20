/**
 * Example JSON format for subscription data:
 * {
 *   "name": "Netflix Premium",
 *   "price": 15.99,
 *   "currency": "USD",
 *   "frequency": "monthly",
 *   "category": "entertainment",
 *   "paymentMethod": "Credit Card",
 *   "status": "active",
 *   "startDate": "2024-01-01T00:00:00.000Z",
 *   "renewalDate": "2024-02-01T00:00:00.000Z",
 *   "user": "507f1f77bcf86cd799439011"
 * }
 */

import mongoose from "mongoose";
// Define the Subscription schema (data model)
const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription Name is required"],
      trim: true,
      minLength: [2, "Subscription Name must be at least 2 characters long"],
      maxLength: [50, "Subscription Name must be at most 50 characters long"],
    },
    price: {
      type: Number,
      required: [true, "Subscription Price is required"],
      min: [0, "Subscription Price must be greater than 0"],
    },
    currency: {
      type: String,
      enum: ["USD", "NPR", "EUR"],
      default: "NPR",
    },
    frequency: {
      type: String,
      enum: ["weekly", "monthly", "yearly"],
      default: "monthly",
    },
    category: {
      type: String,
      enum: ["entertainment", "education", "productivity", "health", "other"],
      required: [true, "Subscription Category is required"],
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment Method is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "expired", "canceled"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: [true, "Subscription Start Date is required"],
      validate: {
        validator: (value) => value <= new Date(),
        message: "Start Date cannot be in the future",
      },
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: (value) => value > this.startDate,
        message: "Renewal Date must be after Start Date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

//Auto calculates renewal date if missing before saving
subscriptionSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency]
    );
    //Auto update status if renewal date passed
    if (this.renewalDate <= this.startDate) {
      this.status = "expired";
    }
  }
  next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
