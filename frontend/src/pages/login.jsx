import { useState } from "react";
import Input from "../components/input";
import Button from "../components/button"
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login(){

    const navigate = useNavigate();

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loading,setLoading] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);

        try{
            const res = await api.post("/auth/login",{
                email,
                password,
            });

            localStorage.setItem("token",res.data.token);

            alert("Login Successful");

            navigate('/dashboard');
        } catch (error){
            alert(error.response?.data?.message || "Login Failed!");
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200"> 
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

                <Input type={"email"} placeholder={"Enter your email"} value={email} onChange={(e) => setEmail(e.target.value)} />

                <Input type={"password"} placeholder={"Enter your password"} value={password} onChange={(e) => setPassword(e.target.value)}/>

                <Button loading={loading}>Login</Button>
            </form>
        </div>
    )
}