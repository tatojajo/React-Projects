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
      <div className="user__header">
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
      </div>
      <div className="user__body">
        <p>
          <strong>
            <label htmlFor="first__name">First Name</label>
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
            <label htmlFor="last__name">Last Name</label>
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
          <label htmlFor="city">City</label>
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
      </div>
      <button
        className="edited-user-node"
        onClick={() => handleEditedUser(editUser)}
      >
        Done
      </button>
    </div>
  ) : (
    <div className="each__user">
      <div className="user__header">
        <img src={image} alt="User" width="100px" />
      </div>
      <div className="user__body">
        <p>
          <strong>
            {firstName} {lastName}
          </strong>
        </p>
        <p className="user-phone">Phone Number: {phoneNumber}</p>
        <p className="user-city">City: {city}</p>
      </div>
    </div>
  );
}

export default UserCard;
