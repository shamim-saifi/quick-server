import { Invoice } from "../model/invoiceModel.js";

export const CreateInvoiceData = async (req, res) => {
  try {
    const { invoiceNumber, totalAmountWithTax, invoiceDate, invoiceItem, ClientCompanyName } =
      req.body;
    await Invoice.create({
      invoiceNumber, totalAmountWithTax, invoiceDate, invoiceItem, ClientCompanyName,
      user: req.user,
    });
    res.status(201).json({
      success: true,
      message: "bill has clreated",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const GetAllInvoiceData = async (req, res) => {
  try {
    const userId = req.user.id;
    const bills = await Invoice.find({user:userId });

    res.status(200).json({
      success: true,
      bills,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const DeleteInvoiceData = async (req, res) => {
  try {
    let SingalBill = await Invoice.findById(req.params.id);
    if (!SingalBill) {
      return res.status(400).json({
        success: false,
        message: "Bill not found",
      });
    }

    await SingalBill.deleteOne();
    res.status(200).json({
      success: true,
      message: "Bill has deleted",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
