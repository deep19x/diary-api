import { useState } from "react";
import Input from "../components/input";
import Button from "../components/button";
import api from "../services/api";

export default function Register(){

    const [name , setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loading,setLoading] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const res = await api.post("/auth/register",{
                name,
                email,
                password,
            });

            alert(res.data.message)
        } catch (error) {
            alert(error.response?.data?.message || "Registration Failed!");
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200">

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-96">

                <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
                
                <Input placeholder={"Enter your name"} value={name} onChange={(e) => setName(e.target.value)}/>

                <Input type={"email"} placeholder={"Enter your email"} value={email} onChange={(e) => setEmail(e.target.value)} />

                <Input type={"password"} placeholder={"Enter your password"} value={password} onChange={(e) => setPassword(e.target.value)}/>

                <Button children={"Register"} loading={loading}/>

            </form>
            
        </div>
    )
}