// import { useState } from "react";

// function SearchBar({ onSearch }) {
//   const [input, setInput] = useState("");

//   function handleSubmit(e) {
//     e.preventDefault();
//     if (!input.trim()) return;
//     onSearch(input);
//     setInput(""); // clear input after search
//   }

//   return (
//     <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
//       <input
//         type="text"
//         placeholder="Enter city"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         className="flex-1 p-2 border rounded-lg"
//       />
//       <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
//         Search
//       </button>
//     </form>
//   );
// }

// export default SearchBar;
