import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import { AuthContext } from "../../Context/Auth";
import { API_URL } from "../../const";
import swal from "sweetalert";

function About() {
  const {
    AuthState: { user },
    loadUser,
  } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const handleUploadFile = (e) => {
    const files = e.target.files[0];

    let data = new FormData();

    data.append("file", files);
    data.append("upload_preset", "xhkmjqak");

    const option = {
      method: "POST",
      body: data,
    };

    setLoading(true);

    fetch("https://api.cloudinary.com/v1_1/annnn/image/upload", option)
      .then((res) => res.json())
      .then(async (dataRes) => {
        if (dataRes) {
          handleEditAvatar(dataRes.url);
        }
      })
      .catch((error) => {
        setLoading(false);
        swal({
          title: "Upload thất bại",
          text: error,
          icon: "error",
          button: "OK",
        });
      });
  };

  const handleEditAvatar = (image) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    const urlencoded = new URLSearchParams();
    urlencoded.append("avatar", image);
    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
    fetch(`${API_URL}/users/${user.id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (typeof result === "object") {
          setLoading(false);
          swal({
            title: "Thay đổi thành công",
            icon: "success",
            button: "OK",
          });
          loadUser();
        }
      })
      .catch((error) => console.log(error));
  };

  let about;

  if (!user) {
    about = <Redirect to="/" />;
  } else if (loading) {
    about = (
      <div className="loading">
        <div className="line-loading"></div>
      </div>
    );
  } else {
    about = (
      <div className="about">
        <div className="about-wrap">
          <div className="about-avatar">
            <img
              src={
                user.avatar
                  ? user.avatar
                  : "https://pdp.edu.vn/wp-content/uploads/2021/05/hinh-anh-avatar-cho-con-gai-1.jpg"
              }
              alt="avatar"
            />
            <label className="about-edit-avatar" htmlFor="avatar">
              Đổi ảnh đại diện
            </label>
            <input
              type="file"
              id="avatar"
              placeholder="Thay đổi ảnh đại diện"
              onChange={handleUploadFile}
            />
          </div>
          <div className="about-info">
            <h1>{user.username}</h1>
            <p>{user.email}</p>
          </div>
          <div className="about-action">
            <button className="about-edit">Chỉnh sữa thông tin</button>
            <button className="about-edit-password">Chỉnh sữa mật khẩu</button>
          </div>
        </div>
      </div>
    );
  }

  return <>{about}</>;
}

export default About;
