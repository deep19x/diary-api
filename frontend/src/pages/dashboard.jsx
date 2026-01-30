import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [diaries, setDiaries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message,setMessage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        fetchDiaries();
    }, []);

    const fetchDiaries = async () => {
        try {
            const res = await api.get("/diary");
            setDiaries(res.data.diaries);
        } catch (error) {
            showMessage("Failed to load diaries");
        } finally {
            setLoading(false);
        }
    };

    const showMessage = (msg) => {
        setMessage(msg);
        setTimeout(()=>{setMessage(""),3000});
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure?");
        if (!confirmDelete) return;

        try {
            await api.delete(`/diary/${id}`);
            showMessage("Diary deleted");

            // Remove from UI without reload
            setDiaries(diaries.filter(d => d._id !== id));
        } catch (error) {
            showMessage("Delete failed");
        }
    };


    if (loading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-4">My Diaries</h1>

            {/* MESSAGE UI */}
            {message && (
                <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4">
                    {message}
                </div>
            )}

            <button onClick={() => navigate('/create')} className="bg-green-600 text-white px-4 py-2 rounded mb-4">
                + New Diary
            </button>

            {diaries.length === 0 ? (
                <p>No diaries yet</p>
            ) : (
                <div className="grid gap-4">
                    {diaries.map((diary) => (
                        <div key={diary._id} className="bg-white p-4 rounded shadow">
                            <h2 className="font-semibold">{diary.title}</h2>
                            <p className="text-gray-600">{diary.content}</p>
                            <button className="bg-blue-300 hover:bg-blue-400 px-4 py-2 rounded-4xl my-2" onClick={() => navigate(`/diary/edit/${diary._id}`)}>Edit</button>
                            <button className="bg-red-300 hover:bg-red-400 px-4 py-2 rounded-4xl my-2 mx-2" onClick={() => { handleDelete(diary._id) }}>Delete</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
