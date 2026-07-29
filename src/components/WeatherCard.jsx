import WeatherDetails from "./WeatherDetails"

const getWeatherCondition = (code) => {
    if (code === 0) return "Clear sky"
    if ([1, 2, 3].includes(code)) {
        return "Partly cloudy"
    }
    if ([45, 48].includes(code)) {
        return "Foggy"
    }
    if ([51, 53, 55, 56, 57].includes(code)) {
        return "Drizzle"
    }
    if ([61, 63, 65, 66, 67].includes(code)) {
        return "Rainy"
    }
    if ([71, 73, 75, 77].includes(code)) {
        return "Snowy"
    }
    if ([80, 81, 82].includes(code)) {
        return "Rain showers"
    }
    if ([85, 86].includes(code)) {
        return "Snow showers"
    }
    if ([95, 96, 99].includes(code)) {
        return "Thunderstorm"
    }
    return "Unknown"
    }

const getWeatherIcon = (code) => {
    if (code === 0) return "☀️"
    if ([1, 2, 3].includes(code)) {
        return "⛅"
    }
    if ([45, 48].includes(code)) {
        return "🌫️"
    }
    if ([51, 53, 55, 56, 57].includes(code)) {
        return "🌦️"
    }
    if ([61, 63, 65, 66, 67].includes(code)) {
        return "🌧️"
    }
    if ([71, 73, 75, 77, 85, 86].includes(code)) {
        return "❄️"
    }
    if ([80, 81, 82].includes(code)) {
        return "🌦️"
    }
    if ([95, 96, 99].includes(code)) {
        return "⛈️"
    }
    return "🌤️"
    }

    const WeatherCard = ({ weather }) => {const condition = getWeatherCondition(weather.weatherCode)
    const icon = getWeatherIcon(weather.weatherCode)

    return (
        <div className="weather-card">
            <div className="weather-main">
                <div>
                    <p className="location-label">
                        Current Weather
                    </p>
                    <h2>
                        {weather.city}, {weather.country}
                    </h2>
                    <p className="condition">
                        {condition}
                    </p>
                </div>
                    <div className="temperature-section">
                        <span className="weather-icon">
                            {icon}
                        </span>
                        <div className="temperature">
                            {weather.temperature}°C
                        </div>
                    </div>
            </div>
            <WeatherDetails
                humidity={weather.humidity}
                windSpeed={weather.windSpeed}
            />
        </div>
    )
}

export default WeatherCard