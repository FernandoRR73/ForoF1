// src/components/QualifyingResults/QualifyingResults.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import DorsalPiloto from '../PosicionesComponents/DorsalPiloto';
const QualifyingResults = () => {
  const { gpNumber } = useParams();
  const [qualifyingResults, setQualifyingResults] = useState(null);

  useEffect(() => {
    const fetchQualifyingResults = async () => {
      try {
        const response = await fetch(`https://ergast.com/api/f1/2024/${gpNumber}/qualifying.xml`);
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDocument = parser.parseFromString(xmlText, 'application/xml');

        const results = Array.from(xmlDocument.getElementsByTagName('QualifyingResult')).map(result => ({
          position: result.getAttribute('position'),
          driverId: result.getElementsByTagName('Driver')[0].getAttribute('driverId'),
          givenName: result.getElementsByTagName('GivenName')[0].textContent,
          familyName: result.getElementsByTagName('FamilyName')[0].textContent,
          constructorName: result.getElementsByTagName('Constructor')[0].getElementsByTagName('Name')[0].textContent,
          q1: result.getElementsByTagName('Q1')[0] ? result.getElementsByTagName('Q1')[0].textContent : 'N/A',
          q2: result.getElementsByTagName('Q2')[0] ? result.getElementsByTagName('Q2')[0].textContent : 'N/A',
          q3: result.getElementsByTagName('Q3')[0] ? result.getElementsByTagName('Q3')[0].textContent : 'N/A'
        }));

        if (results.length > 0) {
          setQualifyingResults(results);
        }
      } catch (error) {
        console.error('Error fetching qualifying results:', error);
      }
    };

    fetchQualifyingResults();
  }, [gpNumber]);

  if (!qualifyingResults) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container qualifying-results">
      <h3>Qualifying Results</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Position</th>
            <th>Driver</th>
            <th>Constructor</th>
            <th>Q1</th>
            <th>Q2</th>
            <th>Q3</th>
          </tr>
        </thead>
        <tbody>
          {qualifyingResults.map((result, index) => (
            <tr key={index}>
              <td>{result.position}</td>
              <td>{result.driverId ? <DorsalPiloto driverId={result.driverId} /> : 'N/A'}</td>
              <td>{result.givenName} {result.familyName}</td>
              <td>{result.constructorName}</td>
              <td>{result.q1}</td>
              <td>{result.q2}</td>
              <td>{result.q3}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QualifyingResults;
