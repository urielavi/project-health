import React, { useState, ChangeEvent } from "react";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [detailsError, setError] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    //05X-XXXXXXX
    const phoneRegex = /^05\d-[0-9]{7}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password: string) => {
    //At least one digit, one capital letter, and one special character
    const passwordRegex =
      /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSave = () => {
    const { email, phone, password } = formData;

    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }

    if (!validatePhone(phone)) {
      setError("Invalid phone format");
      return;
    }

    if (!validatePassword(password)) {
      setError("Invalid password format");
      return;
    }

    const apiUrl = "http://localhost:3000/api/usersCreate";

    // Prepare the request body
    const requestBody = {
      email: email,
      password: password,
      phoneNumber: phone,
      fullName: formData.name,
    };

    // POST request to the update API
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
        });
        setError("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <h1>Registration</h1>
      <form>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" onClick={handleSave}>
          Save
        </button>
        {detailsError && <p style={{ color: "red" }}>{detailsError}</p>}
      </form>
    </div>
  );
};

export default Registration;
