import React, { useContext, useEffect, useState } from "react";
import { API_URL } from "../../const";
import { ProductContext } from "../../Context/ProductContext";

function UserManages() {
  const { loading, setLoading } = useContext(ProductContext);

  useEffect(() => {
    const getAllUsers = () => {
      fetch(`${API_URL}/users`)
        .then((res) => res.json())
        .then((users) => {
          if (typeof users === "object") {
            setUsers(users);
            setLoading(false);
          }
        });
    };

    setLoading(true);
    getAllUsers();
  }, []);

  const [users, setUsers] = useState([]);

  return (
    <>
      <div className="users">
        {loading ? (
          <div className="loading-admin">
            <div class="loader"></div>
          </div>
        ) : (
          users &&
          users.map((user, index) => (
            <div className="users-item">
              <p className="users-id">{index}</p>
              <p className="users-name">{user.username}</p>
              <img
                src={
                  user.avatar
                    ? user.avatar
                    : "https://pdp.edu.vn/wp-content/uploads/2021/05/hinh-anh-avatar-cho-con-gai-1.jpg"
                }
                alt={user.username}
                className="users-avatar"
              />
              <p className="users-email">{user.email}</p>
              <p className="users-role">{user.roleId}</p>

              <div className="review-action">
                <div className="review-edit">
                  <i class="fas fa-pen"></i>
                </div>
                <div className="review-delete">
                  <i class="fas fa-trash"></i>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default UserManages;
