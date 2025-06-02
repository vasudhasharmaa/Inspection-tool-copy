import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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
    <div 
      className="App-container"
      data-testid="sample-size-calculator"
      data-lot-size={lotSize}
      data-inspection-level={inspectionLevel}
      data-sample-size={sampleSize}
    >
      <Paper elevation={3} sx={{ p: 2, mb: 2, background: '#e3f2fd' }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Garment Inspection Sample Quantity Calculator
        </Typography>
        <Box sx={{ display: 'flex', gap: 4, alignItems: 'center', background: '#ede7f6', p: 2, borderRadius: 2, mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            Lot Size: {lotSize}
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            Inspection Level: {inspectionLevel}
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            Sample Size: {sampleSize}
          </Typography>
        </Box>
      </Paper>
      {error && (
        <div style={{ color: "red", marginBottom: "1em" }}>
          {error}
        </div>
      )}
      <form onSubmit={handleCalculate}>
        <TableContainer component={Paper} sx={{ marginTop: 2, marginBottom: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center"><strong>Size</strong></TableCell>
                <TableCell align="center"><strong>Quantity</strong></TableCell>
                <TableCell align="center"><strong>Sample Size</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sizes.map((label, idx) => (
                <TableRow key={idx}>
                  <TableCell align="center">{label}</TableCell>
                  <TableCell align="center">
                    <input
                      type="number"
                      value={quantities[idx]}
                      onChange={e => handleQuantityChange(idx, Number(e.target.value))}
                      style={{ width: 80 }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {sampleSizes.length > 0 ? sampleSizes[idx] : ''}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell align="center"><strong>Total</strong></TableCell>
                <TableCell align="center">
                  <strong>{quantities.reduce((sum, qty) => sum + qty, 0)}</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>{sampleSizes.length > 0 ? sampleSizes.reduce((sum, s) => sum + s, 0) : ''}</strong>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <button type="submit">Calculate</button>
        <button type="button" className="reset-btn" onClick={handleReset}>Reset</button>
      </form>
      {sampleSizes.length > 0 && (
        <Paper elevation={2} sx={{ p: 2, mt: 2, background: '#f3e5f5' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
            Sample Sizes:
          </Typography>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {sampleSizes.map((sample, idx) => (
              <li key={idx}>
                {sizes[idx]}: {sample} pcs
              </li>
            ))}
          </ul>
          <Typography sx={{ mt: 1 }}>
            <strong>Total Sample Size:</strong> {sampleSizes.reduce((sum, s) => sum + s, 0)} pcs
          </Typography>
        </Paper>
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
