const SearchBar = ({cityInput,setCityInput, handleSearch}) => {

    const handleSubmit = (e) => {
        e.preventDefault()
        handleSearch()
    }

    return (
        <form
        className="search-bar"
        onSubmit={handleSubmit}
        >
        <input
            type="text"
            placeholder="Enter city name..."
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
        />
        <button type="submit">
            Get Weather
        </button>
        </form>
    )
}

export default SearchBar