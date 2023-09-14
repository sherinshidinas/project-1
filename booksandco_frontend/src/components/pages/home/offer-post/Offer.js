import React from "react";
import "./Offer.css";

function Offer() {
  return (
    <section className=" offer-post p-4 bg-light">
      <div className="container d-flex">
        <div className=" offer-post-content m-4 ">
          <h3>Upto 75% off</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit porro similique, suscipit fugiat asperiores quidem
            aut, inventore nesciunt recusandae fuga est maiores, incidunt rem.
            Nemo, qui. Sit libero commodi ipsum!
          </p>
          <a href="" className="btn btn-warning">
            shop now
          </a>
        </div>
        <div className=" offer-post-images ">
          <div className="wraper">
            <a href="" className="">
              <img src="/bks1.jpg" alt="" className="rounded m-2"  />
            </a>
            <a href="">
              <img src="/bks-5.jpg" alt="" className="rounded m-2"  />
            </a>
            <a href="">
              <img src="/bks-6.jpeg" alt="" className="rounded m-2 " />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Offer;
