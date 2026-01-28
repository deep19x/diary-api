export default function Button({ children, type = "submit",loading = false }) {
  return (
    <button
      type={type}
      className={`w-full py-2 rounded text-white transition
        ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      disabled={loading}
    >
      {loading ? "Please Wait..." : children}
    </button>
  );
}
