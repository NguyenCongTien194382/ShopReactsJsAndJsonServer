import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/Auth";
import swal from "sweetalert";
import { API_URL } from "../../const";

function Review({ idProduct }) {
  const {
    AuthState: { user },
  } = useContext(AuthContext);

  const [comment, setComment] = useState("");

  const [review, setReview] = useState([]);

  const getComment = () => {
    fetch(`${API_URL}/comment?productId=${idProduct}`)
      .then((res) => res.json())
      .then((result) => {
        setReview(result);
      });
  };

  const postComment = () => {
    if (comment) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("username", user.username);
      urlencoded.append("productId", idProduct);
      urlencoded.append("content", comment);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

      fetch(`${API_URL}/comment`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (typeof result === "object") {
            swal({
              title: "Cảm ơn bạn đã đánh giá về sản phẩm",
              icon: "success",
              button: "OK",
            });
            setComment("");
            getComment();
          }
        })
        .catch((error) => console.log("error", error));
    } else {
      return null;
    }
  };

  useEffect(() => {
    getComment();
  }, []);

  return (
    <div className="review">
      <div className="review-wrap">
        <h1 className="review-title">Review</h1>
        {user ? (
          <div className="review-input">
            <input
              type="text"
              placeholder="Bạn cảm thấy thế nào về sản phẩm ?"
              onChange={(e) => setComment(e.target.value)}
            />
            <input
              onClick={() => postComment()}
              className="review-submit"
              type="submit"
              value="Gửi"
            />
          </div>
        ) : (
          <div className="not-review">
            Cần đăng nhập để có thể đánh giá sản phẩm
          </div>
        )}
      </div>
      <div className="review-content">
        {review &&
          review.map((item) => (
            <div key={item.id} className="review-content-item">
              <p className="review-writer">by {item.username}</p>
              <p className="review-cmt">{item.content}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Review;
