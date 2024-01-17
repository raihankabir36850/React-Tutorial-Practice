import './App.css';
import React from 'react';

function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], '☀️'],
    [[1], '🌤'],
    [[2], '⛅️'],
    [[3], '☁️'],
    [[45, 48], '🌫'],
    [[51, 56, 61, 66, 80], '🌦'],
    [[53, 55, 63, 65, 57, 67, 81, 82], '🌧'],
    [[71, 73, 75, 77, 85, 86], '🌨'],
    [[95], '🌩'],
    [[96, 99], '⛈'],
  ]);
  const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
  if (!arr) return 'NOT FOUND';
  return icons.get(arr);
}

function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function formatDay(dateStr) {
  return new Intl.DateTimeFormat('en', {
    weekday: 'short',
  }).format(new Date(dateStr));
}

class App extends React.Component {
  state = { location: '', isLoading: false, locationName: '', weather: {} };

  handleLocation = (e) => {
    this.setState({ location: e.target.value });
  };

  componentDidMount() {
    this.setState({ location: localStorage.getItem('weather') || '' });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.location !== prevState.location) {
      this.getWeather();
      localStorage.setItem('weather', this.state.location);
    }
  }

  getWeather = async () => {
    if (this.state.location.length <= 3) {
      this.setState({ weather: {} });
      return;
    }
    try {
      // 1) Getting location (geocoding)
      this.setState({ ...this.state, isLoading: true });
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`);
      const geoData = await geoRes.json();
      console.log(geoData);

      if (!geoData.results) throw new Error('Location not found');

      const { latitude, longitude, timezone, name, country_code } = geoData.results.at(0);

      this.setState({ locationName: `${name} ${convertToFlag(country_code)}` });
      // 2) Getting actual weather
      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`);
      const weatherData = await weatherRes.json();
      console.log(weatherData.daily);
      this.setState({ weather: weatherData.daily });
    } catch (err) {
      console.error(err);
    } finally {
      this.setState({ isLoading: false });
    }
  };
  render() {
    return (
      <div className='App'>
        <h1>Classy weather</h1>
        <div>
          <Input location={this.state.location} locationChangeHandler={this.handleLocation} />
        </div>

        {this.state.isLoading && <p className='loader'>Loading...</p>}
        {this.state.weather && this.state.weather.weathercode && <Weather locationName={this.state.locationName} weather={this.state.weather} />}
      </div>
    );
  }
}

class Input extends React.Component {
  render() {
    const { location, locationChangeHandler } = this.props;
    return <input type='text' placeholder='search from location' value={location} onChange={(e) => locationChangeHandler(e)} />;
  }
}

class Weather extends React.Component {
  render() {
    const { temperature_2m_max: max, temperature_2m_min: min, time: dates, weathercode: codes } = this.props.weather;
    return (
      <div>
        <h2>{this.props.locationName}</h2>
        <ul className='weather'>
          {dates.map((date, i) => (
            <Day max={max[i]} min={min[i]} code={codes[i]} date={date} key={date} isToday={i === 0} />
          ))}
        </ul>
      </div>
    );
  }
}

class Day extends React.Component {
  render() {
    const { max, min, code, date, isToday } = this.props;
    return (
      <li className='day'>
        <span>{getWeatherIcon(code)}</span>
        <p>{isToday ? 'Today' : formatDay(date)}</p>
        <p>
          {Math.floor(min)}&deg; &mdash; <strong>{Math.ceil(max)}&deg;</strong>
        </p>
      </li>
    );
  }
}

export default App;
