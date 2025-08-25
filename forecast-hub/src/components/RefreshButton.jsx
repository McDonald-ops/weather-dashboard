// Manual refresh button
function RefreshButton({ onRefresh }) {
  return (
    <button
      onClick={onRefresh}
      className="bg-blue-600 px-4 py-2 rounded-lg text-white font-semibold hover:bg-blue-700 transition"
    >
      🔄 Refresh
    </button>
  );
}

export default RefreshButton;
