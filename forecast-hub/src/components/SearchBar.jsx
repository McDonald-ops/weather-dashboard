function SearchBar({ onSearch }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const city = e.target.city.value.trim();
        if (city) onSearch(city);
      }}
      className="flex items-center gap-2 w-full"
    >
      <input
        name="city"
        type="text"
        placeholder="Search city"
        aria-label="City"
        className="flex-1 p-2 text-sm rounded-lg bg-white text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
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
