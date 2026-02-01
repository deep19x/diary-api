export default function Error({ message, onRetry }) {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-100">
            <p className="text-red-600 text-lg font-semibold mb-4">
                {message || "Something went wrong"}
            </p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Retry
                </button>
            )}
        </div>
    );
}
