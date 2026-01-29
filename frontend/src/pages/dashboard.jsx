import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [diaries, setDiaries] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        fetchDiaries();
    }, []);

    const fetchDiaries = async () => {
        try {
            const res = await api.get("/diary");
            setDiaries(res.data.diaries);
        } catch (error) {
            alert("Failed to load diaries");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-4">My Diaries</h1>

            <button onClick={()=>navigate('/create')} className="bg-green-600 text-white px-4 py-2 rounded mb-4">
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
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
