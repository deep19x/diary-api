import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/input";
import Button from "../components/button";
import api from "../services/api";

export default function CreateDiary(){

    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const [loading,setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);

        try{
            const res = await api.post('/diary/create',{
                title,content,
            });

            alert("Diary Created Successfully!");
            navigate('/dashboard');
        } catch (error){
            console.log(error);
            alert(error.response?.data?.message || "Failed to create Diary");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200">

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-96">

                <h2 className="text-2xl font-bold text-center mb-4">Create Diary</h2>

                <Input 
                    type="text"
                    placeholder="Diary title"
                    value={title}
                    onChange={(e)=>{setTitle(e.target.value)}}
                />

                <textarea className="w-full border p-2 rounded mb-3"
                    placeholder="Write your diary..."
                    rows={5}
                    value={content}
                    onChange={(e)=>{setContent(e.target.value)}}
                />

                <Button loading={loading}>Create Diary</Button>

            </form>

        </div>
    )
}