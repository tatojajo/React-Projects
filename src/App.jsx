import { useState } from "react";
import UserCard from "./component/Card";
import "./App.scss";

function App() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    image: "",
    phoneNumber: "",
    city: "",
    editData: false,
  });
  const [users, setUsers] = useState([]);

  const [editUser, setEditUser] = useState({
    firstName: "",
    lastName: "",
    image: "",
    phoneNumber: "",
    city: "",
    editData: false,
  });

  const handleEnteredValue = (target) => {
    setUser((prev) => {
      return { ...prev, [target.name]: target.value };
    });
  };

  const handelCreateUser = (user) => {
    user.firstName &&
      user.lastName &&
      user.city &&
      setUsers((prev) => [...prev, user]);
    setUser({
      firstName: "",
      lastName: "",
      image: "",
      phoneNumber: "",
      city: "",
      editData: false,
    });
  };

  const handleDeleteUser = (index) => {
    const usersArray = [...users];
    usersArray.splice(index, 1);
    setUsers(usersArray);
  };

  // * Edit mode

  const handleUserEditMode = (index) => {
    setEditUser({ ...users[index] });
    const usersArray = [...users];
    usersArray[index].editData = !usersArray[index].editData;
    setUsers(usersArray);
  };

  return (
    <div className="user">
      <div className="inputs__container">
        <h3 className="form-title">Fill In The Form</h3>
        <div className="inputs__container-content">
          <label htmlFor="image">Enter Your Image</label>
          <input
            value={user.image}
            name="image"
            type="text"
            placeholder="Image"
            id="image"
            onChange={(e) => {
              handleEnteredValue(e.target);
            }}
          />
        </div>
        <div className="inputs__container-content">
          <label htmlFor="first__name">
            Enter First Name{" "}
            <span style={{ color: "red", fontWeight: "900" }}>*</span>
          </label>
          <input
            value={user.firstName}
            name="firstName"
            type="text"
            placeholder="First Name"
            id="first__name"
            onChange={(e) => {
              handleEnteredValue(e.target);
            }}
          />
        </div>
        <div className="inputs__container-content">
          <label htmlFor="last__name">
            Enter Last Name{" "}
            <span style={{ color: "red", fontWeight: "900" }}>*</span>
          </label>
          <input
            value={user.lastName}
            name="lastName"
            type="text"
            placeholder="Last Name"
            id="last__name"
            onChange={(e) => {
              handleEnteredValue(e.target);
            }}
          />
        </div>
        <div className="inputs__container-content">
          <label htmlFor="phone__number">Enter Phone Number</label>
          <input
            value={user.phoneNumber}
            name="phoneNumber"
            type="text"
            placeholder="Phone Number"
            id="phone__number"
            onChange={(e) => {
              handleEnteredValue(e.target);
            }}
          />
        </div>
        <div className="inputs__container-content">
          <label htmlFor="city">
            Enter City{" "}
            <span style={{ color: "red", fontWeight: "900" }}>*</span>
          </label>
          <input
            value={user.city}
            name="city"
            type="text"
            placeholder="City"
            id="city"
            onChange={(e) => {
              handleEnteredValue(e.target);
            }}
          />
        </div>
        <div className="create-user-btn">
          <button onClick={() => handelCreateUser(user)}>Create</button>
        </div>
      </div>

      <div className="users__cards">
        <h3>Created Users</h3>
        {users.map((user, index) => {
          return (
            <div className="user__card">
              <UserCard
                key={user.firstname}
                firstName={user.firstName}
                lastName={user.lastName}
                city={user.city}
                image={user.image}
                phoneNumber={user.phoneNumber}
                index={index}
                editData={user.editData}
                user={user}
                allUsers={users}
                setUsers={setUsers}
                editUser={editUser}
                setEditUser={setEditUser}
              />
              <div className="user__card-delete">
                <button
                  className="user-delete"
                  onClick={() => handleDeleteUser(index)}
                >
                  Delete User
                </button>
                <button
                  className="user-edit-mode"
                  style={{ display: user.editData && "none" }}
                  onClick={() => {
                    handleUserEditMode(index);
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default App;
