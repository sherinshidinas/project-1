import React from 'react'
import './Banner.css'

function Banner() {
  return (
    <>

<section>
  <div
    id="carouselExampleControls"
    className="main-banner carousel slide"
    data-ride="carousel"
    
  >
    <div className="carousel-inner">
      <div className="carousel-item active">
        <img
          className="d-block w-100"
          src="/children-young-adult-banner.jpg"
          alt="First slide"
        />
      </div>
      <div className="carousel-item">
        <img
          className="d-block w-100"
          src="/school-books.jpg"
          alt="Second slide"
        />
      </div>
      <div className="carousel-item">
        <img
          className="d-block w-100"
          src="/top-authors-banner.jpg"
          alt="Third slide"
        />
      </div>
    </div>
    <a
      className="carousel-control-prev"
      href="#carouselExampleControls"
      role="button"
      data-slide="prev"
    >
      <span className="carousel-control-prev-icon" aria-hidden="true" />
      <span className="sr-only">Previous</span>
    </a>
    <a
      className="carousel-control-next"
      href="#carouselExampleControls"
      role="button"
      data-slide="next"
    >
      <span className="carousel-control-next-icon" aria-hidden="true" />
      <span className="sr-only">Next</span>
    </a>
  </div>
</section>




    </>
  )
}

export default Banner