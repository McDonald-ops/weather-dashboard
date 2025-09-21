/**
 * SearchBar component for city weather search
 * 
 * Provides a form input for users to search for weather information
 * by city name. Handles form submission with validation and calls
 * the parent component's search callback with the entered city.
 * 
 * Features:
 * - Form validation (prevents empty submissions)
 * - Input trimming to remove whitespace
 * - Accessible form with proper labels
 * - Responsive design with hover effects
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onSearch - Callback function called with city name
 * @returns {JSX.Element} Search form component
 */
function SearchBar({ onSearch }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // Extract and validate city input
        const city = e.target.city.value.trim();
        if (city) onSearch(city);
      }}
      className="flex items-center gap-2 w-full"
    >
      {/* City input field */}
      <input
        name="city"
        type="text"
        placeholder="Search city"
        aria-label="City"
        className="flex-1 p-2 text-sm rounded-lg bg-white text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
      {/* Submit button */}
      <button
        type="submit"
        className="bg-teal-600 px-3 py-2 text-sm rounded-lg text-white font-bold hover:bg-teal-700 transition"
      >
        Get
      </button>
    </form>
  );
}

export default SearchBar;
