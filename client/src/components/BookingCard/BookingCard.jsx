import { Link } from 'react-router-dom';

import { differenceInCalendarDays, format } from 'date-fns'

import './BookingCard.css'

import { ReactComponent as Moon } from '../../assets/moon.svg'
import { ReactComponent as CalendarEvent } from '../../assets/calendar-event.svg'

const BookingCard = ({ booking, past }) => {

  return (
    <div className="container d-flex justify-content-center">
      <div className="border border-light-subtle rounded-4 m-3 shadow w-75">
        <Link to={"/account/bookings/" + booking?._id} className="link-underline link-underline-opacity-0 text-dark">
          <div className="row">
            <div className="col col-6 d-flex flex-column">
              <div className="ms-3">
                <h3 className="pt-3 lead fw-medium">{booking?.place.name}</h3>
                <div className="fs-5 text-body-tertiary">at {booking?.place.address}</div>
                <div className="fs-5">Entire place hosted by {booking?.place.owner.name}</div>
                <div className="fs-5">Contact via {booking?.place.owner.email}</div>
                <div className="mt-2 border-top w-100"></div>
                <div className='container'>
                  <div className='row p-2 pt-2 ps-0'>
                    <div className='col col-6 border-end'>
                      <div className='fs-5'>
                        <CalendarEvent width="26" height="26" fill="currentColor" className="pe-2 pb-1" />
                        {format(new Date(booking?.checkIn), 'dd-MM-yyyy')}
                      </div>
                      <div className='fs-5'>
                        <CalendarEvent width="26" height="26" fill="currentColor" className="pe-2 pb-1" />
                        {format(new Date(booking?.checkOut), 'dd-MM-yyyy')}
                      </div>

                    </div>
                    <div className='col col-6 ps-4'>
                      <div>
                        <Moon width="22" height="22" fill="currentColor" className="pb-1" />&nbsp;
                        {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights
                      </div>
                      <div className="fs-4">${booking?.place.price}
                        <span className="fs-5 text-body-tertiary"> /per night
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='mt-auto pb-3 ms-4'>
                {past === true
                  ?
                  <div className='fs-5 pt-2 text-body-tertiary text-opacity-75'>
                    {Math.abs(differenceInCalendarDays(new Date(booking.checkIn), new Date()))} days ago...
                  </div>
                  :
                  <div className='fs-5 pt-2 text-body-tertiary text-opacity-75'>
                    {Math.abs(differenceInCalendarDays(new Date(booking.checkIn), new Date())) === 0
                      ?
                      <div>Today...</div>
                      :
                      <div>{Math.abs(differenceInCalendarDays(new Date(booking.checkIn), new Date()))} days left...</div>
                    }
                  </div>
                }
              </div>
            </div>
            <div className="col col-6">
              {booking?.place.photos.length > 0 ?
                <div className="d-flex justify-content-center">
                  {past === true
                    ?
                    <img src={'http://localhost:4000/uploads/' + booking.place.photos[0]} alt="" className='object-fit-cover w-100 rounded-end-4 img-card-booking opacity-50' />
                    :
                    <img src={'http://localhost:4000/uploads/' + booking.place.photos[0]} alt="" className='object-fit-cover w-100 rounded-end-4 img-card-booking' />
                  }

                </div>
                : null}
            </div>
          </div>
        </Link>
      </div>
    </div>

  )
}

export default BookingCard
