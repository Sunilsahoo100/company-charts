import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CompanyDetails = ({ company }) => {
  if (!company) {
    return <div className="details">Select a company to view details</div>;
  }


  const chartData = {
    labels: ['Open', 'High', 'Low', 'Close', 'Turnover (₹ Cr)'],
    datasets: [
      {
        label: `${company.index_name?.replace(/['"]/g, '')} Stock Details`,
        data: [
          parseFloat(company.open_index_value),
          parseFloat(company.high_index_value),
          parseFloat(company.low_index_value),
          parseFloat(company.closing_index_value),
          parseFloat(company.turnover_rs_cr), 
        ],
        backgroundColor: ['#4caf50', '#2196f3', '#ff9800', '#f44336', '#8e44ad'], 
        borderColor: ['#388e3c', '#1976d2', '#f57c00', '#d32f2f', '#7d3c98'], 
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Stock Details Visualization',
      },
    },
  };

  return (
    <div className="details">
      <h2>{company.index_name?.replace(/['"]/g, '')}</h2>
      <Bar data={chartData} options={options} />
      <div style={{ marginTop: '20px' }}>
        <p><strong>Date:</strong> {company.index_date}</p>
        <p><strong>Change Percent:</strong> {company.change_percent}</p>
        <p><strong>Volume:</strong> {company.volume}</p>
        <h3>Additional Details:</h3>
        <p><strong>P/E Ratio:</strong> {company.pe_ratio}</p>
        <p><strong>P/B Ratio:</strong> {company.pb_ratio}</p>
        <p><strong>Dividend Yield:</strong> {company.div_yield}</p>
      </div>
    </div>
  );
};

export default CompanyDetails;
