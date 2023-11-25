import React, { useState } from "react";
import axios from "axios";
import "./styles/ProfileEditForm.css";

function RechargeForm({ handleClose }) {
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const userDataStr = localStorage.getItem("userData");
  const userData = JSON.parse(userDataStr);
  console.log("userData : ", userData);
  const userId = userData._id;
  // console.log(userData._id);
  console.log(userId);
  const BlurBackground = () => {
    return <div className="blur-background"></div>;
  };
  const domain = "127.0.0.1";

  const initPayment = (data) => {
    console.log(data);
    const options = {
      key: "rzp_test_xf1IVPCwVCR0B9", // Replace with your actual Razorpay API key
      amount: data.amount,
      currency: data.currency,
      name: "GenZ",
      description: "Purchase Description",
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = `http://${domain}:5000/api/payment/verifyPayment`;
          const { data } = await axios.post(verifyUrl, response);
          console.log(data);
          const updateUserUrl = `http://${domain}:5000/api/user/update/${userId}`; // Replace with your user update API endpoint
          const updateResponse = await axios.post(updateUserUrl, {
            coins: amount,
          });
          console.log(updateResponse.data.user);
          localStorage.setItem(
            "userData",
            JSON.stringify(updateResponse.data.user)
          );
          handleClose();
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async () => {
    try {
      const orderUrl = `http://${domain}:5000/api/payment/rechargeRequest`;
      const response = await fetch(orderUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.transactionData);
        initPayment(data.transactionData);
      } else {
        console.log("Failed to make the API call.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <BlurBackground />
      <div className="SettingsPage">
        <button className="close-button" onClick={handleClose}>
          ✕
        </button>
        <h1>Recharge Your Wallet</h1>

        <div>
          <div className="namefield">
            <p>Enter Amount :</p>
            <div className="input-box">
              <input
                // value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="text"
                placeholder="Eg. 100"
              />
            </div>
          </div>

          <button onClick={handlePayment} className="button">
            {loading && (
              <img
                src="https://i.gifer.com/ZKZx.gif"
                height={"20px"}
                style={{ marginRight: "5px" }}
              />
            )}
            Recharge
          </button>
        </div>
      </div>
    </div>
  );
}

export default RechargeForm;
