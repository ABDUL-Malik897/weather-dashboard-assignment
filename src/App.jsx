import { useEffect, useState } from "react"
import SearchBar from "./components/SearchBar"
import WeatherCard from "./components/WeatherCard"
import "./App.css"

function App() {
  const [cityInput, setCityInput] = useState("")
  const [selectedCity, setSelectedCity] = useState("Lucknow")
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [lastUpdated, setLastUpdated] = useState(null)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const handleSearch = () => {
    const city = cityInput.trim()
    if (!city) {
      return
    }
    setSelectedCity(city)
    setCityInput("")
  }

  useEffect(() => {
    const controller = new AbortController()
    const fetchWeather = async () => {
      try {
        setLoading(true)
        setError("")
        const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(selectedCity)}&count=1&language=en&format=json`,{signal: controller.signal})
        if (!geoResponse.ok) {
          throw new Error("Unable to find city")
        }
        const geoData = await geoResponse.json()
        if (!geoData.results || geoData.results.length === 0) {
          throw new Error("City not found")
        }
        const {latitude,longitude,name,country} = geoData.results[0]
        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&wind_speed_unit=kmh`, {signal: controller.signal})

        if (!weatherResponse.ok) {
          throw new Error("Unable to fetch weather data")
        }

        const weatherData = await weatherResponse.json()

        setWeather({city: name, country, temperature: Math.round(weatherData.current.temperature_2m), humidity: weatherData.current.relative_humidity_2m, windSpeed: Math.round(weatherData.current.wind_speed_10m), weatherCode: weatherData.current.weather_code})

        setLastUpdated(new Date())
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message)
          setWeather(null)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }
    fetchWeather()
    const intervalId = setInterval(() => {
      fetchWeather()
    }, 60000)
    return () => {
      controller.abort()
      clearInterval(intervalId)
    }
  }, [selectedCity])

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  console.log("DeployX is awesom")

  return (
    <main className="weather-app">
      <div className="weather-container">
        <header className="weather-header">
          <div>
            <p className="header-label">
              LIVE WEATHER
            </p>
            <h1>Weather Dashboard</h1>
            <p>
              Search for a city to view its current
              weather conditions.
            </p>
          </div>
          <span className="live-badge">
            ● Live
          </span>
        </header>
        <SearchBar
          cityInput={cityInput}
          setCityInput={setCityInput}
          handleSearch={handleSearch}
        />
        {loading && (
          <div className="status-message">
            Loading weather data...
          </div>
        )}
        {error && (
          <div className="status-message error-message">
            {error}
          </div>
        )}
        {!loading && !error && weather && (
          <>
            <WeatherCard weather={weather} />
            <div className="weather-footer">
              <span>
                {lastUpdated &&
                  `Last updated: ${lastUpdated.toLocaleTimeString()}`}
              </span>
              <span>
                Auto-refreshes every 60 seconds
              </span>
            </div>
          </>
        )}
        <p className="screen-info">
          Screen width: {windowWidth}px
        </p>
      </div>
    </main>
  )
}

export default App