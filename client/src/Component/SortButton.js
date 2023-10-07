import React, { useState } from "react";
import "./styles/SortButton.css"; // Make sure to import the CSS file

const SortButton = ({ onSort }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSort = (option) => {
    setIsOpen(false);
    setSelectedOption(null); // Reset selected option for the next click
    onSort(option);
  };

  const toggleOption = (option) => {
    setIsOpen(false);
    setSelectedOption(option);
    onSort(option);
  };

  return (
    <div className="sort-container">
      <span onClick={() => setIsOpen(!isOpen)} className="sort-button">
        <img
          width="30"
          height="30"
          src="https://img.icons8.com/ios/50/generic-sorting.png"
          alt="generic-sorting"
        />
      </span>

      {isOpen && (
        <div className="options-container">
          <label>
            <input
              type="checkbox"
              onChange={() => toggleOption("experienceHighToLow")}
              checked={selectedOption === "experienceHighToLow"}
            />
            Experience High to Low
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => toggleOption("experienceLowToHigh")}
              checked={selectedOption === "experienceLowToHigh"}
            />
            Experience Low to High
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => toggleOption("ordersHighToLow")}
              checked={selectedOption === "ordersHighToLow"}
            />
            Orders High to Low
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => toggleOption("ordersLowToHigh")}
              checked={selectedOption === "ordersLowToHigh"}
            />
            Orders Low to High
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => toggleOption("priceHighToLow")}
              checked={selectedOption === "priceHighToLow"}
            />
            Price High to Low
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => toggleOption("priceLowToHigh")}
              checked={selectedOption === "priceLowToHigh"}
            />
            Price Low to High
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => toggleOption("ratingHighToLow")}
              checked={selectedOption === "ratingHighToLow"}
            />
            Rating High to Low
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => toggleOption("ratingLowToHigh")}
              checked={selectedOption === "ratingLowToHigh"}
            />
            Rating Low to High
          </label>
        </div>
      )}
    </div>
  );
};

export default SortButton;
