import React from "react";
import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import { userData } from "../../lib/dummyData";
import Map from "../../components/map/Map";
import { useLoaderData } from "react-router-dom";
import DOMPurify from 'dompurify'

function SinglePage() {
  const post = useLoaderData()
  console.log(post)
  console.log(post.data.title)
  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.data.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.data.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.data.address}</span>
                </div>
                <div className="price">Rs {post.data.Price}</div>
              </div>

              <div className="user">
                <img src={post.data.user.avatar} alt="" />
                <span>{post.data.user.username}</span>
              </div>
            </div>
            <div className="bottom" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(post.data.postDetail.desc)}}></div>
          </div>
        </div>
      </div>

      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Utilities</span>
                {
                  post.data.postDetail.utilities === "owner" ? 
                    <p>Owner is responsible</p> : 
                    <p>Tenant is responsible</p>
                }
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                {
                  post.data.postDetail.pet === "allowed" ? 
                    <p>Pets Allowed</p>: 
                    <p>Pets not Allowed</p>
                }
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Property fees</span>
                <p>{post.data.postDetail.income}</p>
              </div>
            </div>
          </div>

          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{post.data.postDetail.size} sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{post.data.bedroom} beds</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{post.data.bathroom} bathroom</span>
            </div>
          </div>

          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>{post.data.postDetail.school> 999? post.data.postDetail.school/1000 + "km" : post.data.postDetail.school + 'm'} away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{post.data.postDetail.bus>999? post.data.postDetail.bus/1000 + 'km': post.data.postDetail.bus + 'm'} away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{post.data.postDetail.restaurant>999? post.data.postDetail.restaurant/1000 + 'km' : post.data.postDetail.restaurant + 'm'} away</p>
              </div>
            </div>
          </div>

          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post.data]} />
          </div>
          <div className="buttons">
            <button>
              <img src="/chat.png" alt="" />
              Send a Message
            </button>
            <button>
              <img src="/save.png" alt="" />
              Save the Place
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
