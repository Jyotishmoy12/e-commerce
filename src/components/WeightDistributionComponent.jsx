import React, { useState, useEffect } from 'react';

const WeightDistributionModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalWeight, setTotalWeight] = useState(100);
  const [error, setError] = useState('');
  const [activeProduct, setActiveProduct] = useState(null);
  const [modifiedProducts, setModifiedProducts] = useState(new Set());

  const availableProducts = [
    "Product 1",
    "Product 2",
    "Product 3",
    "Product 4",
    "Product 5",
    "Product 6"
  ];

  const [products, setProducts] = useState([]);
  
  const totalPercentage = products.reduce((sum, p) => sum + p.percentage, 0);

  useEffect(() => {
    if (totalPercentage > 100) {
      setError('Total percentage cannot exceed 100%');
    } else {
      setError('');
    }
  }, [totalPercentage]);

  // Enhanced distribution function that respects locked values
  const distributeRemaining = (products, changedIndex, newValue) => {
    const updatedProducts = [...products];
    const unmodifiedIndices = products
      .map((_, index) => index)
      .filter(index => index !== changedIndex && !modifiedProducts.has(index));
    
    // Update the changed product
    updatedProducts[changedIndex] = {
      ...updatedProducts[changedIndex],
      percentage: newValue
    };

    // Calculate total percentage used by modified products
    const modifiedTotal = products.reduce((sum, _, index) => {
      if (index === changedIndex || modifiedProducts.has(index)) {
        return sum + (index === changedIndex ? newValue : products[index].percentage);
      }
      return sum;
    }, 0);

    const remainingPercentage = 100 - modifiedTotal;

    // If there are unmodified products, distribute remaining percentage
    if (unmodifiedIndices.length > 0) {
      const percentagePerProduct = remainingPercentage / unmodifiedIndices.length;
      unmodifiedIndices.forEach(index => {
        updatedProducts[index] = {
          ...updatedProducts[index],
          percentage: Math.max(0, Math.min(percentagePerProduct, remainingPercentage))
        };
      });
    }

    return updatedProducts;
  };

  const handleAddProduct = (e) => {
    const value = e.target.value;
    if (!value) return;

    if (selectedProducts.length < 4) {
      const newSelectedProducts = [...selectedProducts, value];
      setSelectedProducts(newSelectedProducts);
      
      // Calculate even distribution including new product
      const newProductCount = products.length + 1;
      const evenPercentage = 100 / newProductCount;
      
      const newProducts = [
        ...products.map(p => ({ ...p, percentage: evenPercentage })),
        { name: value, percentage: evenPercentage }
      ];
      
      setProducts(newProducts);
      setActiveProduct(products.length);
      setModifiedProducts(new Set()); // Reset modified products when adding new one
      e.target.value = '';
    }
  };

  const handlePercentageChange = (index, value) => {
    const newValue = Number(value);
    
    if (newValue <= 100) {
      // Add the changed product to modified set
      const newModifiedProducts = new Set(modifiedProducts);
      newModifiedProducts.add(index);
      setModifiedProducts(newModifiedProducts);

      const newProducts = distributeRemaining([...products], index, newValue);
      setProducts(newProducts);
      setError('');
    } else {
      setError('Percentage cannot exceed 100%');
    }
  };

  const removeProduct = (index, productName) => {
    const newSelectedProducts = selectedProducts.filter(p => p !== productName);
    const newProducts = products.filter((_, i) => i !== index);
    
    // Redistribute percentages evenly after removal
    if (newProducts.length > 0) {
      const evenPercentage = 100 / newProducts.length;
      newProducts.forEach(product => {
        product.percentage = evenPercentage;
      });
    }
    
    setSelectedProducts(newSelectedProducts);
    setProducts(newProducts);
    setActiveProduct(null);
    setModifiedProducts(new Set()); // Reset modified products when removing one
    setError('');
  };

  const handleTotalWeightChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setTotalWeight(value === '' ? '' : Number(value));
    }
  };

  const modalStyles = {
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: isOpen ? 'flex' : 'none',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      maxWidth: '800px',
      width: '90%',
      maxHeight: '90vh',
      overflowY: 'auto',
      position: 'relative',
    },
    header: {
      marginBottom: '20px',
      borderBottom: '1px solid #eee',
      paddingBottom: '10px',
    },
    button: {
      padding: '8px 16px',
      borderRadius: '4px',
      border: '1px solid #ddd',
      backgroundColor: '#fff',
      cursor: 'pointer',
      fontSize: '14px',
    },
    select: {
      width: '100%',
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid #ddd',
      marginBottom: '20px',
    },
    input: {
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid #ddd',
      width: '100px',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
      marginTop: '20px',
    },
    card: {
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '15px',
      backgroundColor: '#f8f8f8',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
    cardActive: {
      border: '2px solid #3b82f6',
      boxShadow: '0 2px 4px rgba(59, 130, 246, 0.1)',
    },
    cardLocked: {
      borderColor: '#22c55e',
      boxShadow: '0 2px 4px rgba(34, 197, 94, 0.1)',
    },
    removeButton: {
      padding: '4px 8px',
      borderRadius: '4px',
      border: '1px solid #ff4444',
      backgroundColor: '#fff',
      color: '#ff4444',
      cursor: 'pointer',
      fontSize: '12px',
    },
    totalDisplay: {
      textAlign: 'right',
      marginTop: '20px',
      fontWeight: 'bold',
    },
    error: {
      color: '#ef4444',
      fontSize: '14px',
      marginTop: '10px',
      textAlign: 'center',
    },
    weightInfo: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '14px',
      marginTop: '5px',
      color: '#666',
    },
    lockIndicator: {
      display: 'inline-block',
      marginLeft: '8px',
      color: '#22c55e',
      fontSize: '12px',
    }
  };

  return (
    <div>
      <button 
        onClick={() => setIsOpen(true)}
        style={modalStyles.button}
      >
        Configure Weight Distribution
      </button>

      <div style={modalStyles.modalOverlay} onClick={() => setIsOpen(false)}>
        <div style={modalStyles.modalContent} onClick={e => e.stopPropagation()}>
          <div style={modalStyles.header}>
            <h2>Weight Distribution Configuration</h2>
          </div>

          <div>
            <div>
              <label>Add Product (Max 4)</label>
              <select 
                onChange={handleAddProduct}
                disabled={selectedProducts.length >= 4}
                style={modalStyles.select}
              >
                <option value="">Select a product</option>
                {availableProducts.map((product) => (
                  <option 
                    key={product} 
                    value={product}
                    disabled={selectedProducts.includes(product)}
                  >
                    {product}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Total Weight (kg)</label>
              <input
                type="text"
                inputMode="numeric"
                pattern="\d*"
                value={totalWeight}
                onChange={handleTotalWeightChange}
                style={modalStyles.input}
              />
            </div>

            <div style={modalStyles.grid}>
              {products.map((product, index) => {
                const isActive = index === activeProduct;
                const isLocked = modifiedProducts.has(index);
                const cardStyle = {
                  ...modalStyles.card,
                  ...(isActive ? modalStyles.cardActive : {}),
                  ...(isLocked ? modalStyles.cardLocked : {})
                };

                return (
                  <div 
                    key={index} 
                    style={cardStyle}
                    onClick={() => setActiveProduct(index)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <h3 style={{ margin: 0 }}>
                        {product.name}
                        {isLocked && <span style={modalStyles.lockIndicator}>Locked</span>}
                      </h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeProduct(index, product.name);
                        }}
                        style={modalStyles.removeButton}
                      >
                        Remove
                      </button>
                    </div>
                    
                    <div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={product.percentage}
                        onChange={(e) => handlePercentageChange(index, Number(e.target.value))}
                        style={{ width: '100%', marginBottom: '10px' }}
                      />
                      <div style={modalStyles.weightInfo}>
                        <span>Percentage: {product.percentage.toFixed(1)}%</span>
                        <span>
                          Weight: {totalWeight ? ((totalWeight * product.percentage) / 100).toFixed(2) : '0.00'} kg
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {error && <div style={modalStyles.error}>{error}</div>}

            {products.length > 0 && (
              <div style={{
                ...modalStyles.totalDisplay,
                color: totalPercentage === 100 ? '#22c55e' : '#666'
              }}>
                <div>Total Percentage: {totalPercentage.toFixed(1)}%</div>
                <div>Remaining Percentage: {(100 - totalPercentage).toFixed(1)}%</div>
                <div>Distributed Weight: {totalWeight ? ((totalWeight * totalPercentage) / 100).toFixed(2) : '0.00'} kg</div>
                <div>Remaining Weight: {totalWeight ? (totalWeight - ((totalWeight * totalPercentage) / 100)).toFixed(2) : '0.00'} kg</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeightDistributionModal;