import { Link } from 'react-router-dom';

import './HomePlaceCard.css'

const HomePlaceCard = ({ place }) => {
  return (
    <Link to={'/place/' + place._id} className="col col-sm-6 col-md-4 col-lg-3 rounded lh-1 link-underline link-underline-opacity-0 text-dark fade-in-style">
      <div >{place.photos.length > 0
        ?
        <div>
          <img src={'http://localhost:4000/uploads/' + place.photos[0]} alt="" className='col col-3 rounded-4 object-fit-cover w-100 img-height-place-card' />

        </div>
        :
        null
      }
      </div>

      <div className="fs-5 text-truncate pt-2 pb-1">{place.name}</div>
      <div className="fs-6 text-black-50 pb-1">{place.address}</div>
      <div className='pb-4 mt-1'><span className='fw-bold'>${place.price} </span>per night</div>

    </Link>
  )
}

export default HomePlaceCard