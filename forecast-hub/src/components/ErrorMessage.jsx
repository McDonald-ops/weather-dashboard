import { useEffect } from "react";

/**
 * ErrorMessage component for displaying API errors and notifications
 * 
 * Shows error messages in a fixed position notification that:
 * - Auto-dismisses after 4 seconds
 * - Can be manually closed by clicking the X button
 * - Appears with a fade-in animation
 * - Handles various error types (invalid city, network issues, API failures)
 * 
 * @param {Object} props - Component props
 * @param {string} props.message - Error message to display
 * @param {Function} props.onClose - Callback function to close the error message
 * @returns {JSX.Element|null} Error notification component or null if no message
 */
function ErrorMessage({ message, onClose }) {
  /**
   * Auto-dismiss error message after 4 seconds
   * Cleans up timer on component unmount or message change
   */
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  // Don't render anything if no error message
  if (!message) return null;

  return (
    <div className="fixed top-6 right-6 bg-teal-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-between w-[300px] animate-fadeIn">
      {/* Error message text */}
      <span className="text-sm">{message}</span>
      {/* Close button */}
      <button
        onClick={onClose}
        className="ml-4 text-white font-bold hover:text-gray-200"
        aria-label="Close error message"
      >
        ✕
      </button>
    </div>
  );
}

export default ErrorMessage;
