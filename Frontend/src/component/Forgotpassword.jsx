import { useState } from "react";
import axios from "axios";


export const Forgotpassword = function(){
    let [email,setEmail] = useState("");
    let [role,setRole]= useState("");
    let [token,setToken]= useState("");
    let handleSubmit= (e)=>{
        e.preventDefault();
        let form= {
            email
        }
        axios.post(`http://localhost:8000/app/${role.toLowerCase()}/forgot-password`,form)
        .then((res)=>{
            setToken(res.data.resetToken);
            alert(res.data.message);
        }).catch((err)=>{
            alert(err.response?.data?.message || "something went wrong");
        })
    } 
    return(
        <div>
            <h1>Reset Password</h1>
            <form onSubmit={handleSubmit}>
                <input required type="email" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <select
                    required
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    >
                    <option value="">--Choose role--</option>
                    <option value="User">User</option>
                    <option value="Mentor">Mentor</option>
                    <option value="HR">HR</option>
                </select>
                <button type="submit">Send</button>
            </form>
        </div>
    );
}