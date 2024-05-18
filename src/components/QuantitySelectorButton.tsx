import React, { useState } from "react"

const QuantitySelectorButton = () => {
  const [quantity, setQuantity] = useState(1)

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1)
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1)
    }
  }

  return (
    <div className="quantity">
      <div className="product-details__quantity">Quantity:</div>
      <button className="button__quantity" onClick={handleDecrement}>
        -
      </button>
      <span>{quantity}</span>
      <button className="button__quantity" onClick={handleIncrement}>
        +
      </button>
    </div>
  )
}

export default QuantitySelectorButton
