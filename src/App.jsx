import './App.css';
import { useEffect, useState } from 'react';
import Sidebar from './components/sidebar';
import Papa from 'papaparse'; 

import CompanyDetails from './components/companyDetails';

function App() {
  const [jsonData, setJsonData] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/shaktids/stock_app_test/refs/heads/main/dump.csv'
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const csvData = await response.text();

        const { data } = Papa.parse(csvData, { header: true });
        setJsonData(data.slice(0, 10000)); 
      } catch (error) {
        console.error('Error fetching the data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <Sidebar data={jsonData} onCompanySelect={setSelectedCompany} />
        {loading ? (
          <div className="details">Loading data...</div>
        ) : (
          <CompanyDetails company={selectedCompany} />
        )}
      </div>
    </div>
  );
}

export default App;
