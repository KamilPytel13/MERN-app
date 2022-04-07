import './NavWeather.css';

const NavWeather = props => {
    return (
      <div>
        <p>Weather</p>
        <img
          src="https://cdn3.iconfinder.com/data/icons/tiny-weather-1/512/cloudy-512.png"
          height={40}
          width={40}
        />
      </div>
    );
}

export default NavWeather;