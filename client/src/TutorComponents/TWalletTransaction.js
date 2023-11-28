// React component file (WalletTransactions.js)

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TWalletTransactions.css";

const WalletTransactions = ({ data }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/service/getransaction-datails/${data}`
        );
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching wallet transactions:", error);
      }
    };

    fetchTransactions();
  }, [data]);

  return (
    <div className="transactions-container">
      <h2>Wallet Transactions</h2>

      <div className="table-container">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {transactions
              .map((transaction) => (
                <tr key={transaction._id}>
                  <td>{new Date(transaction.date).toLocaleString()}</td>
                  <td className={transaction.type.toLowerCase()}>
                    {transaction.type}
                  </td>
                  <td className={transaction.type.toLowerCase()}>
                    {transaction.amount}
                  </td>
                  <td>{transaction.reason}</td>
                </tr>
              ))
              .reverse()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WalletTransactions;
