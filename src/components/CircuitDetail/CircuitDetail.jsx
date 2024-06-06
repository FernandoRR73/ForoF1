// src/components/CircuitDetail/CircuitDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import CircuitMap from './CircuitMap'; // Importa el componente CircuitMap
import 'bootstrap/dist/css/bootstrap.min.css';
import './CircuitDetail.css'; // Asegúrate de tener este archivo CSS para los estilos personalizados

const CircuitDetail = () => {
  // Obtiene el ID del circuito de los parámetros de la URL
  const { circuitId } = useParams();
  // Define estados para almacenar datos del circuito y detalles del circuito
  const [circuit, setCircuit] = useState(null);
  const [circuitDetails, setCircuitDetails] = useState(null);
  const [gpNumber, setGpNumber] = useState(null);
  const [hasSprint, setHasSprint] = useState(false);
  const [raceDate, setRaceDate] = useState(null);
  const [currentDate] = useState(new Date());

  // Efecto para cargar datos del circuito cuando cambia el ID del circuito
  useEffect(() => {
    // Función asincrónica para obtener datos del circuito desde una API externa
    const fetchCircuitData = async () => {
      try {
        // Realiza una solicitud para obtener datos del circuito desde la API externa
        const response = await fetch(`https://ergast.com/api/f1/current/circuits/${circuitId}.xml`);
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDocument = parser.parseFromString(xmlText, 'application/xml');

        // Extrae información del circuito y la ubicación desde el XML obtenido
        const circuitData = xmlDocument.getElementsByTagName('Circuit')[0];
        const locationData = circuitData.getElementsByTagName('Location')[0];

        // Establece el estado del circuito con la información obtenida
        setCircuit({
          circuitName: circuitData.getElementsByTagName('CircuitName')[0].textContent,
          locality: locationData.getElementsByTagName('Locality')[0].textContent,
          country: locationData.getElementsByTagName('Country')[0].textContent,
          url: circuitData.getAttribute('url')
        });
      } catch (error) {
        console.error('Error fetching circuit data:', error);
      }
    };

    // Función asincrónica para cargar detalles específicos del circuito desde un archivo JSON local
    const fetchCircuitDetails = async () => {
      try {
        // Realiza una solicitud para obtener detalles del circuito desde un archivo JSON local
        const response = await fetch('/circuitDetails.json');
        const data = await response.json();
        // Establece el estado de los detalles del circuito con los datos obtenidos
        setCircuitDetails(data[circuitId]);
      } catch (error) {
        console.error('Error fetching circuit details:', error);
      }
    };

    // Función asincrónica para obtener el número de Gran Premio y la fecha de la carrera
    const fetchGpNumber = async () => {
      try {
        // Realiza una solicitud para obtener datos de la temporada actual desde una API externa
        const response = await fetch('https://ergast.com/api/f1/current.xml');
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDocument = parser.parseFromString(xmlText, 'application/xml');

        // Busca el Gran Premio correspondiente al circuito actual en los datos de la temporada
        const race = Array.from(xmlDocument.getElementsByTagName('Race')).find(
          race => race.getElementsByTagName('Circuit')[0].getAttribute('circuitId') === circuitId
        );

        // Si se encuentra el Gran Premio, establece el estado con el número de GP y la fecha de la carrera
        if (race) {
          setGpNumber(race.getAttribute('round'));
          setRaceDate(new Date(race.getElementsByTagName('Date')[0].textContent));
        }
      } catch (error) {
        console.error('Error fetching GP number:', error);
      }
    };

    // Función asincrónica para verificar si el circuito tiene eventos de sprint
    const checkSprint = async () => {
      try {
        // Realiza una solicitud para obtener datos sobre eventos de sprint desde un archivo JSON local
        const response = await fetch('/circuitSprintData.json');
        const data = await response.json();
        // Busca la información del circuito en los datos obtenidos
        const circuitInfo = data.circuits.find(circuit => circuit.circuitId === circuitId);
        // Establece el estado con la información sobre si el circuito tiene eventos de sprint
        setHasSprint(circuitInfo ? circuitInfo.hasSprint : false);
      } catch (error) {
        console.error('Error fetching sprint data:', error);
      }
    };

    // Llama a las funciones de carga de datos al cargar el componente o cuando cambia el ID del circuito
    fetchCircuitData();
    fetchCircuitDetails();
    fetchGpNumber();
    checkSprint();
  }, [circuitId]);

  // Renderiza un mensaje de carga si los datos del circuito o los detalles del circuito no están disponibles
  if (!circuit || !circuitDetails) {
    return <div>Loading...</div>;
  }

  // Verifica si la carrera ya ha ocurrido comparando la fecha de la carrera con la fecha actual
  const raceHasHappened = raceDate && currentDate >= raceDate;

  // Renderiza la información del circuito y enlaces a resultados de carreras si corresponde
  return (
    <div className="container circuit-detail">
      <h2>{circuit.circuitName}</h2>
      <div className="row align-items-stretch">
        <div className="col-md-6 d-flex flex-column">
          <CircuitMap circuitId={circuitId} className="flex-grow-1" />
        </div>
        <div className="col-md-6 d-flex flex-column">
          <div className="circuit-details flex-grow-1">
            <h3>Details</h3>
            <p><strong>Location:</strong> {circuit.locality}, {circuit.country}</p>
            <p><strong>Right Turns:</strong> {circuitDetails.rightTurns}</p>
            <p><strong>Left Turns:</strong> {circuitDetails.leftTurns}</p>
            <p><strong>DRS Zones:</strong> {circuitDetails.drsZones}</p>
            <p><a href={circuit.url} target="_blank" rel="noopener noreferrer">More Information</a></p>
          </div>
        </div>
      </div>
      {/* Renderiza enlaces a resultados de carreras si el Gran Premio ya ha ocurrido */}
      {gpNumber && raceHasHappened && (
        <div className="results-links">
          <Link to={`/race-results/${gpNumber}`}>Race Results</Link>
          <Link to={`/qualifying-results/${gpNumber}`}>Qualifying Results</Link>
          {hasSprint && <Link to={`/sprint-results/${gpNumber}`}>Sprint Results</Link>}
        </div>
      )}
    </div>
  );
};

export default CircuitDetail;
