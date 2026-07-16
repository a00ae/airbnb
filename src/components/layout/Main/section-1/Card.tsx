import { RiArrowLeftSLine, RiArrowRightLongLine, RiArrowRightSLine } from '@remixicon/react'
import  './card.scss'


const Card = () => {
  return (
    <div className='card'>
      <div className="heading-container">
        <div className="left">
        <h2>Popular homes in Istanbul</h2>
        <div className="arrow">
          <RiArrowRightLongLine />
        </div>

        </div>
        {/* right */}
        <div className="right">

          <div className="arrow-left-line">
          <RiArrowLeftSLine />

          </div>
          <div className="arrow-right-line">
          <RiArrowRightSLine />

          </div>
          
        </div>

      </div>


    </div>
  )
}

export default Card