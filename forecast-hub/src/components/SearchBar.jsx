function SearchBar({ onSearch }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const city = e.target.city.value.trim();
        if (city) onSearch(city);
        e.target.reset();
      }}
      className="flex flex-col gap-4 mt-6"
    >
      <input
        name="city"
        type="text"
        placeholder="Search city here"
        className="p-4 text-lg rounded-xl bg-white text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
      <button className="bg-teal-600 py-4 text-lg rounded-xl text-white font-bold hover:bg-teal-700 transition">
        GET WEATHER
      </button>
    </form>
  );
}

export default SearchBar;
