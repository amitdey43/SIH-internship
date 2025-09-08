import axios from "axios";
import { useState } from "react";

export const RegisterHR = function() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        companyName: "",
        companyWebsite: "",
        designation: "",
        department: "",
        industryType: "",
        officeLocation: "",
    });

    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Send JSON directly
        axios.post("http://localhost:8000/app/hr/register", formData, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        })
        .then((res) => {
            console.log("HR Registered:", res.data);
            console.log(res.data.token);
            
            // Reset form on success
            setFormData({
                name: "",
                email: "",
                password: "",
                companyName: "",
                companyWebsite: "",
                designation: "",
                department: "",
                industryType: "",
                officeLocation: "",
            });
            setError(""); // Clear previous errors
        })
        .catch((err) => {
            const msg = err.response?.data?.message || err.response?.data || "Something went wrong";
            setError(msg);
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <form onSubmit={handleSubmit} className="userform">
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />

            <input type="text" name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} required />
            <input type="text" name="companyWebsite" placeholder="Company Website" value={formData.companyWebsite} onChange={handleChange} />

            <input type="text" name="designation" placeholder="Designation" value={formData.designation} onChange={handleChange} required />
            <input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleChange} required />
            <input type="text" name="industryType" placeholder="Industry Type" value={formData.industryType} onChange={handleChange} required />
            <input type="text" name="officeLocation" placeholder="Office Location" value={formData.officeLocation} onChange={handleChange} required />

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button type="submit">Register HR</button>
        </form>
    );
};
