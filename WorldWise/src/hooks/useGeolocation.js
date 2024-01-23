import { useState } from 'react';

export function useGeolocation(deafalutPosition = null) {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(deafalutPosition);
  const [error, setError] = useState(null);

  function init() {
    if (!navigator.geolocation) return setError('Your browser does not support geolocation');

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setTimeout(function () {
          setIsLoading(false);
        }, 2000);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return { isLoading, position, error, init };
}
