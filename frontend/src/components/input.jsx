export default function Input({type = "text",placeholder,value,onChange}){
    return (
        <input type={type} placeholder={placeholder} value={value} onChange={onChange} className="w-full mb-3 p-2 border rounded focus:outline focus:ring-2 focus:bg-blue-200"/>
    )
};