import { Link } from 'react-router-dom';

import './PlaceCard.css';

const PlaceCard = ({ place }) => {

  return (

    <Link to={'/account/places/' + place._id} className="link-underline link-underline-opacity-0 text-dark">
      <div className="container d-flex justify-content-center">
        <div className="border border-light-subtle rounded-4 m-3 shadow w-75">
          <div className="row">
            <div className="col col-6 d-flex flex-column">
              <div className="ms-3">
                <h4 className="pt-3 lead fw-medium">{place.name}</h4>
                <div className="fs-5 text-body-tertiary">at {place.address}</div>
                <div className="ms-0 mt-3 border-top w-75"></div>
                <div className="places-list-description pt-3 lh-base">{place.description?.substring(0, 250)}{place.description.length > 250 ? '...' : ''}</div>
              </div>
              <div className="mt-auto ms-3 pb-3 d-flex justify-content-between">
                <div className="fs-4 mt-auto">${place.price}<span className="fs-5 text-body-tertiary"> /per night</span></div>
                <div className='pt-1'>
                </div>
              </div>
            </div>
            <div className="col col-6">
              {
                place.photos.length > 0
                  ?
                  <div className="d-flex justify-content-center">
                    <img src={'http://localhost:4000/uploads/' + place.photos[0]} alt="" className='object-fit-cover w-100 rounded-end-4 place-img-card' />
                  </div>
                  :
                  null
              }
            </div>
          </div>
        </div>
      </div>

    </Link>
  )
}
export default PlaceCard

