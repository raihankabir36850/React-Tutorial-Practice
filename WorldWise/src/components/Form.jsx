// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';

import Button from './Button';
import Spinner from './Spinner';
import Message from './Message';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './Form.module.css';
import { useCities } from '../contexts/CitiesContext';

/* eslint-disable no-unused-vars */
// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

// eslint-disable-next-line react-refresh/only-export-components
export function convertToEmoji(countryCode) {
  console.log(countryCode);
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

function Form() {
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [emoji, setEmoji] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { createCity, isLoading: isFormLoading } = useCities();

  const mapLat = searchParams.get('lat');
  const mapLng = searchParams.get('lng');

  useEffect(
    function () {
      async function getPosition() {
        if (!mapLat && !mapLng) return;
        try {
          setIsLoading(true);
          setError('');
          const res = await fetch(`${BASE_URL}?latitude=${mapLat}&longitude=${mapLng}`);
          const data = await res.json();

          if (!data.countryCode) {
            throw new Error("It doesn't seem to be a city.please click somewhere else.");
          }
          setCityName(data.city || data.locality || '');
          setCountry(data.countryName || '');
          setEmoji(convertToEmoji(data.countryCode));
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      getPosition();
    },
    [mapLat, mapLng]
  );

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName && !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat: mapLat,
        lng: mapLng,
      },
    };

    await createCity(newCity);
    navigate('/app');
  }

  if (isLoading) return <Spinner />;
  if (!mapLat && !mapLng) return <Message message='Start clicking by somewhere on the map.' />;
  if (error) return <Message message={error} />;

  return (
    <form className={`${styles.form} ${isFormLoading ? styles.loading : ''}`} onSubmit={(e) => handleSubmit(e)}>
      <div className={styles.row}>
        <label htmlFor='cityName'>City name</label>
        <input id='cityName' onChange={(e) => setCityName(e.target.value)} value={cityName} />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor='date'>When did you go to {cityName}?</label>
        <DatePicker selected={date} onChange={(date) => setDate(date)} dateFormat='dd/MM/yyyy' />
      </div>

      <div className={styles.row}>
        <label htmlFor='notes'>Notes about your trip to {cityName}</label>
        <textarea id='notes' onChange={(e) => setNotes(e.target.value)} value={notes} />
      </div>

      <div className={styles.buttons}>
        <Button type='primary'>Add</Button>
        <Button
          type='back'
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
