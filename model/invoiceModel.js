import mongoose, { model } from "mongoose";

const InvoiceSchema = new mongoose.Schema({
  invoiceNumber: Number,
  totalAmountWithTax: Number,
  
  invoiceDate: String,
  ClientCompanyName: String,
  invoiceItem: [
    {
      type:String,
    }
  ],

  user: {
    ref: "user",
    type: mongoose.Schema.Types.ObjectId,
  },
});

export const Invoice = mongoose.model("invoice", InvoiceSchema);
