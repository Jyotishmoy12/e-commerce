import React, { useState } from 'react';

const WeightDistributionComponent = () => {
  // State for total weight, initialized to 100
  const [totalWeight, setTotalWeight] = useState(100);

  // State for products, each with a name and initial percentage
  const [products, setProducts] = useState([
    { name: 'Product 1', percentage: 25 },
    { name: 'Product 2', percentage: 25 },
    { name: 'Product 3', percentage: 25 },
    { name: 'Product 4', percentage: 25 },
  ]);

  // Handler for changes to the total weight input
  const handleTotalWeightChange = (e) => {
    const value = e.target.value;
    // Allow empty input or only digits
    if (value === '' || /^\d+$/.test(value)) {
      // Update state, converting to number if not empty
      setTotalWeight(value === '' ? '' : Number(value));
    }
  };

  // Handler for changes to product percentages
  const handlePercentageChange = (index, value) => {
    const newValue = Number(value);
    // Create a new array of products
    const newProducts = products.map((product, i) => {
      // Update only the changed product
      if (i === index) {
        return { ...product, percentage: newValue };
      }
      return product;
    });
    // Update the products state
    setProducts(newProducts);
  };

  // Calculate the total percentage of all products
  const totalPercentage = products.reduce((sum, product) => sum + product.percentage, 0);

  return (
    <div style={{ padding: '1rem', fontFamily: 'Arial, sans-serif' }}>
      {/* Total Weight Input Section */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="totalWeight" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          Total Weight (kg)
        </label>
        <input
          id="totalWeight"
          type="text"
          inputMode="numeric"
          pattern="\d*"
          value={totalWeight}
          onChange={handleTotalWeightChange}
          style={{
            width: '10%',
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '16px',
            appearance: 'textfield', // Removes spinner buttons in webkit browsers
          }}
        />
      </div>

      {/* Product Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        {/* Map through each product and create a card */}
        {products.map((product, index) => (
          <div key={index} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>{product.name}</h3>
            {/* Slider for percentage adjustment */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
              <input
                type="range"
                min="0"
                max="100"
                value={product.percentage}
                onChange={(e) => handlePercentageChange(index, e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
            {/* Display current percentage */}
            <p style={{ margin: '0.5rem 0' }}>
              Percentage: {product.percentage}%
            </p>
            {/* Calculate and display weight based on percentage */}
            <p style={{ margin: '0.5rem 0' }}>
              Weight: {totalWeight ? ((totalWeight * product.percentage) / 100).toFixed(2) : '0.00'} kg
            </p>
          </div>
        ))}
      </div>

      {/* Display total percentage with color indicator */}
      {/* <p style={{ marginTop: '1rem', fontWeight: 'bold', color: totalPercentage === 100 ? 'green' : 'red' }}>
        Total Percentage: {totalPercentage}% {totalPercentage !== 100 && '(Adjust to reach 100%)'}
      </p> */}
    </div>
  );
};

export default WeightDistributionComponent;