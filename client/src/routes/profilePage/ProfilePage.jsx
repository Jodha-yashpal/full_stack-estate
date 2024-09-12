import React, { useContext, Suspense } from "react";
import "./profilePage.scss";
import List from "../../components/list/List";
import Chat from "../../components/chat/Chat";
import apiRequest from "../../lib/apiRequest.js";
import { Link, useLoaderData, useNavigate, Await } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";

function ProfilePage() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const data = useLoaderData();
  console.log(data);

  const navigate = useNavigate();

  const handleLogout = async (e) => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img src={currentUser.data.avatar || "/noavatar.jpg"} alt="" />
            </span>
            <span>
              Username: <b>{currentUser.data.username}</b>
            </span>
            <span>
              email: <b>{currentUser.data.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to="/add">
              <button>Create New Post</button>
            </Link>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {
                (postResponse) => <List posts={postResponse.data.data.userPosts} />
              }
            </Await>
          </Suspense>
          
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {
                (postResponse) => <List posts={postResponse.data.data.savedPosts} />
              }
            </Await>
          </Suspense>
        </div>
      </div>

      <div className="chatContainer">
        <div className="wrapper">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
