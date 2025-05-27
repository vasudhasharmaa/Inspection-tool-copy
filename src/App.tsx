import React, { useState } from 'react';
import './App.css';
import SampleSizeCalculator from './SampleSizeCalculator';

function App() {
  // API data (read-only for user)
  const [apiLotSize, setApiLotSize] = useState<number | null>(null);
  const [apiInspectionLevel, setApiInspectionLevel] = useState<string>("");
  const [apiSampleSize, setApiSampleSize] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  React.useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setApiLotSize(2000);
      setApiInspectionLevel("II");
      setApiSampleSize(125);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <div>Loading data from API...</div>;

  const sizes = [
    "11/12yrs", "12-18", "13/14yrs", "15/16yrs", "18-24", "2-3", "3-4", "4-5", "5-6"
  ];

  return (
    <SampleSizeCalculator
      sizes={sizes}
      lotSize={apiLotSize!}
      inspectionLevel={apiInspectionLevel}
      sampleSize={apiSampleSize!}
    />
  );
}

export default App;
