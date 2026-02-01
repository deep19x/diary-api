import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader";
import Error from "../components/error";

export default function Dashboard() {
    const [diaries, setDiaries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message,setMessage] = useState("");
    const [search,setSearch] = useState("");
    const [page,setPage] = useState(1);
    const [error, setError] = useState("");

    const pageSize = 5;

    const navigate = useNavigate();

    useEffect(() => {
        fetchDiaries();
    }, []);

    useEffect(()=>{
        setPage(1);
    },[search]);

    const fetchDiaries = async () => {
        try {
            setLoading(true);
            setError("");
            const res = await api.get("/diary");
            setDiaries(res.data.diaries);
        } catch (error) {
            setError("Failed to load diaries");;
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
    
    const filteredDiaries = diaries.filter((diary) => {
        return (
            diary.title.toLowerCase().includes(search.toLowerCase()) || diary.content.toLowerCase().includes(search.toLowerCase())
        )
    });

    const totalPages = Math.ceil(filteredDiaries.length/pageSize);
    const startIndex = (page - 1)*pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedDiaries = filteredDiaries.slice(startIndex,endIndex);


    if (loading) return <Loader/>;
    if (error) return <Error message={error} onRetry={fetchDiaries} />;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-4">My Diaries</h1>

            {/* MESSAGE UI */}
            {message && (
                <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4">
                    {message}
                </div>
            )}

            <button onClick={() => navigate('/create')} className="bg-green-600 text-white px-4 py-2 rounded mb-4 block">
                + New Diary
            </button>

            <input type="text" className="border mx-auto mb-4 rounded-2xl w-100 text-center p-2 bg-white focus:bg-blue-200 " onChange={(e) => setSearch(e.target.value)} placeholder="Search Diary" value={search} />

            {diaries.length === 0 ? (
                <p>No diaries yet</p>
            ) : (
                <div className="grid gap-4">
                    {paginatedDiaries.map((diary) => (
                        <div key={diary._id} className="bg-white p-4 rounded shadow">
                            <h2 className="font-semibold">{diary.title}</h2>
                            <p className="text-gray-600">{diary.content}</p>
                            <button className="bg-blue-300 hover:bg-blue-400 px-4 py-2 rounded-4xl my-2" onClick={() => navigate(`/diary/edit/${diary._id}`)}>Edit</button>
                            <button className="bg-red-300 hover:bg-red-400 px-4 py-2 rounded-4xl my-2 mx-2" onClick={() => { handleDelete(diary._id) }}>Delete</button>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex justify-center items-center gap-4 mt-6">
                <button className="px-2 bg-gray-500 text-white p-2 rounded-2xl disabled:cursor-not-allowed font-bold cursor-pointer" onClick={()=>setPage(page-1)} disabled={page === 1}>Prev</button>
                <span>Page {page} of {totalPages}</span>
                <button className="px-2 bg-gray-500 text-white p-2 rounded-2xl font-bold disabled:cursor-not-allowed cursor-pointer" disabled={page === totalPages} onClick={()=>setPage(page+1)}>Next</button>
            </div>
        </div>
    );
}
