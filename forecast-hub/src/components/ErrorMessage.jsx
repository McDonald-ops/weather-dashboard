// Shows errors (invalid city, network issues)
import { useEffect } from "react";

function ErrorMessage({ message, onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed top-6 right-6 bg-teal-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-between w-[300px] animate-fadeIn">
      <span className="text-sm">{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-white font-bold hover:text-gray-200"
      >
        ✕
      </button>
    </div>
  );
}

export default ErrorMessage;
