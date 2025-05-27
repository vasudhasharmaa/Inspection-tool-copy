import React, { useState } from 'react';

type SampleSizeCalculatorProps = {
  sizes: string[];
  lotSize: number;
  inspectionLevel: string;
  sampleSize: number;
};

const SampleSizeCalculator: React.FC<SampleSizeCalculatorProps> = ({
  sizes,
  lotSize,
  inspectionLevel,
  sampleSize,
}) => {
  
  const [quantities, setQuantities] = useState<number[]>(Array(sizes.length).fill(0));
  const [sampleSizes, setSampleSizes] = useState<number[]>([]);
  const [error, setError] = useState<string>("");
  const [warning, setWarning] = useState<string>("");

  const handleQuantityChange = (index: number, value: number) => {
    const newQuantities = [...quantities];
    newQuantities[index] = value;
    setQuantities(newQuantities);
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (quantities.some(qty => qty < 0)) {
      setError("Quantities must be greater than 0");
      return;
    }
    if (quantities.every(qty => qty === 0)) {
      setError("At least one quantity must be greater than 0");
      return;
    }
    const totalQty = quantities.reduce((sum, qty) => sum + qty, 0);
    const calculated = quantities.map(qty =>
      Math.round((qty / totalQty) * sampleSize)
    );
    setSampleSizes(calculated);
    const sum = calculated.reduce((sum, s) => sum + s, 0);
    if (sum !== sampleSize) {
      setWarning(
        `Warning: The total sample size (${sum}) does not match the required sample size (${sampleSize}). This is usually due to rounding.`
      );
    } else {
      setWarning("");
    }
  };

  const handleReset = () => {
    setQuantities(Array(sizes.length).fill(0));
    setSampleSizes([]);
    setError("");
    setWarning("");
  };

  return (
    <div className="App-container">
      <h1>Garment Inspection Sample Calculator</h1>
      <div>Lot Size: {lotSize}</div>
      <div>Inspection Level: {inspectionLevel}</div>
      <div>Sample Size: {sampleSize}</div>
      {error && (
        <div style={{ color: "red", marginBottom: "1em" }}>
          {error}
        </div>
      )}
      <form onSubmit={handleCalculate}>
        <div>
          <label>Quantities by Size:</label>
          {sizes.map((label, idx) => (
            <div key={idx}>
              <label>{label}:</label>
              <input
                type="number"
                value={quantities[idx]}
                onChange={e => handleQuantityChange(idx, Number(e.target.value))}
              />
            </div>
          ))}
        </div>
        <button type="submit">Calculate</button>
        <button type="button" className="reset-btn" onClick={handleReset}>Reset</button>
      </form>
      {sampleSizes.length > 0 && (
        <div className="SampleSizes-section">
          <h2>Sample Sizes:</h2>
          <ul>
            {sampleSizes.map((sample, idx) => (
              <li key={idx}>
                {sizes[idx]}: {sample} pcs
              </li>
            ))}
          </ul>
          <p>
            <strong>Total Sample Size:</strong> {sampleSizes.reduce((sum, s) => sum + s, 0)} pcs
          </p>
        </div>
      )}
      {warning && (
        <div style={{ color: "orange", marginBottom: "1em" }}>
          {warning}
        </div>
      )}
    </div>
  );
};

export default SampleSizeCalculator;
