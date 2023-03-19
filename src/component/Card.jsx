import React, { useState } from "react";
import UserImg from "../programmer.png";
import "../App.scss";

function UserCard({
  firstName,
  lastName,
  image,
  phoneNumber,
  city,
  editData,
  allUsers,
  index,
  setUsers,
  editUser,
  setEditUser,
  key,
}) {
  const handleEnteredValue = (target) => {
    setEditUser((prev) => {
      return { ...prev, [target.name]: target.value };
    });
  };

  const handleEditedUser = (editUser) => {
    const users = [...allUsers];
    users[index].firstName = editUser.firstName;
    users[index].lastName = editUser.lastName;
    users[index].image = editUser.image;
    users[index].phoneNumber = editUser.phoneNumber;
    users[index].city = editUser.city;
    users[index].editData = editUser.editData;
    setUsers(users);
  };

  return editData ? (
    <div className="each__user">
      <>
        <label htmlFor="image">Image</label>
        <input
          value={editUser.image}
          name="image"
          type="text"
          placeholder="Image"
          id="image"
          onChange={(e) => {
            handleEnteredValue(e.target);
          }}
        />

        <p>
          <strong>
            <label htmlFor="first__name">
              First Name <span style={{ color: "red" }}>*</span>
            </label>
            <input
              value={editUser.firstName}
              name="firstName"
              type="text"
              placeholder="First Name"
              id="first__name"
              onChange={(e) => {
                handleEnteredValue(e.target);
              }}
            />
          </strong>
          <strong>
            <label htmlFor="last__name">
              Last Name <span style={{ color: "red" }}>*</span>
            </label>
            <input
              value={editUser.lastName}
              name="lastName"
              type="text"
              placeholder="Last Name"
              id="last__name"
              onChange={(e) => {
                handleEnteredValue(e.target);
              }}
            />
          </strong>
        </p>
        <p className="user-phone">
          <label htmlFor="phone__number">Phone Number</label>
          <input
            value={editUser.phoneNumber}
            name="phoneNumber"
            type="text"
            placeholder="Phone Number"
            id="phone__number"
            onChange={(e) => {
              handleEnteredValue(e.target);
            }}
          />
        </p>
        <p className="user-city">
          <label htmlFor="city">
            <strong>
              City <span style={{ color: "red" }}>*</span>
            </strong>
          </label>
          <input
            type="text"
            value={editUser.city}
            name="city"
            placeholder="City"
            id="city"
            onChange={(e) => {
              handleEnteredValue(e.target);
            }}
          />
        </p>
      </>
      <button
        className="edited-user-done"
        onClick={() =>
          editUser.firstName &&
          editUser.lastName &&
          editUser.city &&
          handleEditedUser(editUser)
        }
      >
        Done
      </button>
    </div>
  ) : (
    <div className="each__user--created">
      <div className="user__header">
        <img src={UserImg} alt="User" width="100px" />
        <p className="user--name">
          <strong>
            {firstName} {lastName}
          </strong>
        </p>
      </div>
      <div className="user__body">
        <p className="user-phone">
          <strong>Phone Number:</strong>{" "}
          {phoneNumber ? phoneNumber : "No Phone Number!!"}
        </p>
        <p className="user-city">
          <strong>City:</strong> {city}
        </p>
      </div>
    </div>
  );
}

export default UserCard;
