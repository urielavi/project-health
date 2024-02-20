import { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

// register component
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
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    // Phone validation for the pattern 05X-XXXXXXX
    const phoneRegex = /^05\d-[0-9]{7}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password: string) => {
    // Password validation with at least one digit, one capital letter, and one special character
    const passwordRegex =
      /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSave = () => {
    const { email, phone, password } = formData;

    // Validate email
    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }

    // Validate phone
    if (!validatePhone(phone)) {
      setError("Invalid phone format");
      return;
    }

    // Validate password
    if (!validatePassword(password)) {
      setError("Invalid password format");
      return;
    }

    // Assuming you have your server URL where the update API is hosted
    const apiUrl = "http://localhost:3000/api/users/create";

    // Prepare the request body
    const requestBody = {
      email: email,
      password: password,
      phoneNumber: phone,
      fullName: formData.name,
    };

    // Make a POST request to the update API
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        console.log(data);
        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
        });
        setError("");
        // You can add further logic here based on the response
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error, e.g., show an error message to the user
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

// login component
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = () => {
    const { email, password } = formData;

    // Assuming you have your server URL where the update API is hosted
    const apiUrl = "http://localhost:3000/api/users/login";

    // Prepare the request body
    const requestBody = {
      email: email,
      password: password,
    };

    // Make a POST request to the update API
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        console.log(data);
        if (data.message === "OK") {
          console.log("ok section");
          // Redirect the user to the "Users" component
          navigate("/users");
        } else {
          console.log("nok section");
        }
        setFormData({
          email: "",
          password: "",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error, e.g., show an error message to the user
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <form>
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
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

//users component
const Users = () => {
  const [userDetails, setUserDetails] = useState<
    Array<{ email: string; fullName: string }>
  >([]);

  useEffect(() => {
    // Assuming you have your server URL where the user details API is hosted
    const apiUrl = "http://localhost:3000/api/users/details";

    // Make a GET request to the user details API
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        setUserDetails(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error, e.g., show an error message to the user
      });
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Full Name</th>
          </tr>
        </thead>
        <tbody>
          {userDetails.map((user) => (
            <tr key={user.email}>
              <td>{user.email}</td>
              <td>{user.fullName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [activeComponent, setActiveComponent] = useState("registration");

  return (
    <div>
      <div>
        <button onClick={() => setActiveComponent("registration")}>
          Registration
        </button>
        <button onClick={() => setActiveComponent("login")}>Users</button>
      </div>
      {activeComponent === "registration" && <Registration />}
      {activeComponent === "users" && <Users />}
      {activeComponent === "login" && <Login />}
    </div>
  );
};

export default App;
