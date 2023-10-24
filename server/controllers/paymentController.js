const RazorPay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();

// console.log(
//   process.env.RAZORPAY_KEY_ID + " {  " + process.env.RAZORPAY_KEY_SECRETE
// );

const generateShortReceipt = () => {
  // Generate a random 8-character hexadecimal string
  const randomHex = crypto.randomBytes(4).toString("hex");

  // Combine it with a prefix to ensure uniqueness (adjust as needed)
  const receipt = `RZPY-${randomHex}`;

  return receipt;
};

const rechargeRequest = async (req, res) => {
  try {
    const instance = new RazorPay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRETE,
    });

    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: generateShortReceipt(),
    };

    instance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        console.log("something Went Wrong!");
        return res.status(500).json({ message: "something Went Wrong!" });
      }
      res.status(200).json({ transactionData: order });

      console.log("Transaction done");
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal Server Error" });
  }
};

const verifyPayment = (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRETE)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature == expectedSign) {
      return res
        .status(200)
        .json({ maessage: "Payment Verified Successfully" });
    } else {
      return res.status(400).json({ message: "Invalid Signature sent" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal Server Error" });
  }
};

module.exports = {
  rechargeRequest,
  verifyPayment,
};
