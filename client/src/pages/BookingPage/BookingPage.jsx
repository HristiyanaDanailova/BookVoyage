import { useState, useEffect, useContext } from "react";

import { Navigate, useParams } from "react-router-dom";

import axios from "axios";
import { format, differenceInCalendarDays } from "date-fns";

import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import "./BookingPage.css";

import PlaceGallery from "../../components/PlaceGallery/PlaceGallery";
import { UserContext } from "../../userContext";
import { ReactComponent as CalendarEvent } from '../../assets/calendar-event.svg'
import { ReactComponent as ArrowRight } from '../../assets/arrow-right.svg'
import { ReactComponent as Moon } from '../../assets/moon.svg'
import { ReactComponent as GeoAlt } from '../../assets/geo-alt.svg'
import { ReactComponent as Email } from '../../assets/email.svg'
import { ReactComponent as Telephone } from '../../assets/telephone.svg'

const BookingPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const { user } = useContext(UserContext)
  const [loading, setLoading] = useState(true)
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    if (id) {
      axios.get("/booking/booking/" + id).then(({ data }) => {
        if (data.booking) {
          setBooking(data.booking);
          setLoading(false)
        } else {
          setRedirect(true)
        }
      }).catch(error => {
        let errorMessage = error.response.data.errors
          ? error.response.data.errors['errors'][0].msg
          : error.response.data.message;
        toast.error(errorMessage, {
          position: "top-right",
          theme: 'light'
        });
      })
    }
  }, []);

  if (redirect) {
    return <Navigate to='/' />
  }
  if (loading) {
    return 'Loading...'
  }
  if (booking.user.email !== user.email) {
    return <Navigate to='/' />
  }
  if (!booking) {
    return "";
  }
  return (
    <div>
      <div className="booking-page-content">
        <div className="fs-2 text-margin">{booking.place.name}</div>
        <a
          target="_blank"
          rel="noreferrer"
          href={"https://maps.google.com/?q=" + booking.place.address}
          className="fs-6 fw-bold text-dark text-margin"
        >
          <GeoAlt width="18" height="18" fill="currentColor" className="me-1 mb-1" />
          {booking.place.address}
        </a>
        <div className="shadow-lg rounded-3 p-4 text-margin mt-3 booking-info-width">
          <div className="fs-5 text-black-50 fw-medium"> Your booking information:</div>
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-column">
              <div className="d-flex pt-2">
                <div className="fs-5 d-flex fw-medium">
                  <Moon width="26" height="26" fill="currentColor" classnamesvg="pt-1" />
                  &nbsp;
                  {differenceInCalendarDays(
                    new Date(booking.checkOut),
                    new Date(booking.checkIn)
                  )}{" "}
                  nights:{" "}&nbsp;
                </div>
                <div className="fs-5 fw-medium text-black-50">
                  <CalendarEvent width="26" height="26" fill="currentColor" className="pe-2 pb-1" />
                  {format(new Date(booking.checkIn), "dd-MM-yyyy")}
                  &nbsp;&nbsp;
                  <ArrowRight width="21" height="21" fill="currentColor" className="pb-1" />
                  &nbsp;&nbsp;
                  <CalendarEvent width="26" height="26" fill="currentColor" className="pe-2 pb-1" />
                  {format(new Date(booking.checkOut), "dd-MM-yyyy")}
                </div>
              </div>
              <div className="fs-5 pt-1 text-black-50 fw-medium">Reserved for <span className="fw-medium text-black">{booking.numberOfGuests} guests</span></div>
              <div className="fs-5 pt-1 text-black-50 fw-medium ">Host contact information:&nbsp;
                <div className="text-black-50 pt-1">
                  <Email width="28" height="28" className="pb-1" />&nbsp;<span className="fw-medium text-black">{booking.place.owner.email}</span><br></br>
                  <Telephone width="30" height="30" className="pb-2" />&nbsp;<span className="fw-medium text-black">{booking.place.owner.phoneNumber}</span>
                </div> </div>
            </div>

            <div>

              <div className="bg-light p-4 rounded-2 fw-medium fs-5 shadow mt-2">
                <div className="pb-2">
                  ${booking.place.price} x {" "}
                  {differenceInCalendarDays(
                    new Date(booking.checkOut),
                    new Date(booking.checkIn)
                  )} nights
                </div>

                <div className="d-flex border-top pt-2 justify-content-between text-black-50">Total: <h4 className="text-black">${booking.price}</h4>
                </div>
              </div>
            </div>

          </div>

        </div>
        <PlaceGallery photos={booking.place.photos} />
      </div>


    </div>
  );
};
export default BookingPage;
