const WeatherDetails = ({ humidity, windSpeed }) => {
    return (
        <div className="weather-details">
            <div className="detail-box">
                <span>Humidity</span>
                <strong>{humidity}%</strong>
            </div>
            <div className="detail-box">
                <span>Wind Speed</span>
                <strong>{windSpeed} km/h</strong>
            </div>
        </div>
    )
}

export default WeatherDetails