import React, { useState, useEffect } from "react";

const Users = () => {
  const [userDetails, setUserDetails] = useState<
    Array<{ email: string; fullName: string }>
  >([]);

  useEffect(() => {
    const apiUrl = "http://localhost:3000/api/usersDetails";

    //GET request to the user details API
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setUserDetails(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
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

export default Users;
