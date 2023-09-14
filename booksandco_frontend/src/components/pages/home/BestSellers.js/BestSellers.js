import React from 'react'
import './BestSellers.css'
import Newreleased from '../new-released/Newreleased'
import Banner from '../banner/Banner'

function BestSellers() {
  return (
    <section>
      <div>
        <img src="https://www.bookswagon.com/images/promotionimages/web/1_alltimefavourite.jpg?v=2.0" className='w-100 d-block' alt="" />
      </div>
      <div>
      <img src="https://www.bookswagon.com/bannerimages/79_inr.jpg?v=1.9"className='w-100 d-block' alt="" />
    </div>
    </section>
  )
}

export default BestSellers