import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Input from "../components/input";
import Button from "../components/button";

export default function EditDiary() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchDiary = async () => {
            try {
                const res = await api.get(`/diary/${id}`);
                setTitle(res.data.title);
                setContent(res.data.content);
            } catch (err) {
                alert(err.response?.data?.message || "Failed to fetch diary");
            }
        };
        fetchDiary();
    }, [id]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.put(`/diary/${id}`,{title,content});
            alert("Diary is Updated!");
            navigate('/dashboard');
        } catch (error) {
            alert(error.response?.data?.message || "Update Failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-200 flex items-center justify-center">

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-96">

                <Input type="text" placeholder={"Edit Title"} value={title} onChange={(e)=>{e.target.value}}/>

                <textarea className="w-full border p-2 rounded mb-3"
                    placeholder="Write your diary..."
                    rows={5}
                    value={content}
                    onChange={(e)=>{setContent(e.target.value)}}
                />

                <Button>Edit</Button>


            </form>
            
        </div>
    )
}