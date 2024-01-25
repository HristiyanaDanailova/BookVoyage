import { useContext, useState } from 'react';

import { Link, Navigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import axios from 'axios';
import { differenceInCalendarDays, areIntervalsOverlapping, format } from 'date-fns'

import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import './BookingForm.css'

import { UserContext } from '../../userContext';
import Error from '../Error/Error';

const validationSchema = yup.object({
  checkIn: yup.date().required('Check in date is required').transform((curr, orig) => orig === '' ? null : curr).min(new Date(Date.now() - 86400000), 'You can\'t choose a past date'),
  checkOut: yup.date().required('Check out date is required').transform((curr, orig) => orig === '' ? null : curr),
  numberOfGuests: yup.number().transform((value) => Number.isNaN(value) ? null : value).required('Number of guests is a required field').min(1, 'Number of guests can\'t be less than 1').max(50, 'Number of guests can\'t be greater than 50'),
  name: yup.string().required('Name is a required field').min(3, 'Name shouldn\'t be less than 3 symbols long').max(256, 'Name can\'t be longer than 256 symbols long'),
  phoneNumber: yup.string().required('Phone number is a required field').matches(/^[0-9]{10}$/, 'Invalid phone number'),

}).required();

const BookingForm = ({ price, id, booked, maxGuests, owner }) => {
  const { user } = useContext(UserContext);
  const [redirect, setRedirect] = useState('');
  const { register, handleSubmit, formState: { errors }, getValues, watch } = useForm({
    resolver: yupResolver(validationSchema),
    values: {
      checkIn: '',
      checkOut: '',
      numberOfGuests: 2,
      name: user?.name,
      phoneNumber: user?.phoneNumber

    }
  });
  const watchCheckIn = watch('checkIn');
  const watchCheckOut = watch('checkOut');

  function calculateNumberOfNights() {
    return differenceInCalendarDays(new Date(getValues('checkOut')), new Date(getValues('checkIn')));
  }
  function validDates(booking) {
    return areIntervalsOverlapping({
      start: new Date(getValues('checkIn')),
      end: new Date(getValues('checkOut'))
    }, {
      start: new Date(booking.startDate),
      end: new Date(booking.endDate)
    }) ? false : true
  }

  async function handleBookPlace(data) {
    try {
      //checks if the place has been booked for the given dates
      if (booked.length) {
        for (let booking of booked) {
          if (!validDates(booking)) {
            toast.error('This place has alredy been reserved for your dates! :(', {
              position: "top-right",
              theme: 'light'
            });
            return 0;
          }
        }
      }

      //checks if numberOfGuests is greater than the maximum number of allowed guests
      if (data.numberOfGuests > maxGuests) {
        toast.error(`This place is suitable for a maximum of ${maxGuests} guests`, {
          position: "top-right",
          theme: 'light'
        });
        return 0;
      }
      const priceCalculated = calculateNumberOfNights() * price;
      const { data: res } = await axios.post('/booking/book-place', {
        ...data,
        price: priceCalculated,
        place: id
      });
      const bookingId = res.booking._id;
      toast.success('You have successfully booked this place! :)')
      setRedirect(bookingId);
    } catch (error) {
      let errorMessage = error.response.data.errors
        ? error.response.data.errors['errors'][0].msg
        : error.response.data.message;
      toast.error(errorMessage, {
        position: "top-right",
        theme: 'light'
      });
    }
  }
  if (redirect) {
    return <Navigate to={`/account/bookings/${redirect}`} />
  }
  return (
    <div>
      <div className="border rounded-3 p-3 shadow-lg">
        <div className="d-flex justify-content-center fs-4">
          {" "}
          Price: {price}$ / per night
        </div>
        <form onSubmit={handleSubmit(handleBookPlace)}>
          <div className="border rounded-3 mt-2">
            <div className="d-flex">
              <div className="p-3">
                <label>Check in:</label>
                <input {...register('checkIn')} type="date" min={format(new Date(), 'yyyy-MM-dd')} max={getValues('checkOut') ? format(new Date(getValues('checkOut')), 'yyyy-MM-dd') : '2035-01-01'} className={"border border-0 " + (errors.checkIn ? 'form-control is-invalid' : '')} name="checkIn" />
                {errors.checkIn ? <Error message={errors.checkIn.message} /> : null}
              </div>
              <div className="p-3 border-start">
                <label>Check out:</label>
                <input {...register('checkOut')} type="date" min={getValues('checkIn') ? format(new Date(getValues('checkIn')), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd')} className={"border border-0 " + (errors.checkOut ? 'form-control is-invalid' : '')} name="checkOut" />
                {errors.checkOut ? <Error message={errors.checkOut.message} /> : null}
              </div>
            </div>
            <div className="p-3 border-top">
              <label>Number of guests:</label>
              <input  {...register('numberOfGuests')} type="number" className={"ms-0 mb-0 mt-1 border rounded-3 w-100 " + (errors.numberOfGuests ? 'form-control is-invalid' : '')} name="numberOfGuests" min={1} max={50} />
              {errors.numberOfGuests ? <Error message={errors.numberOfGuests.message} /> : null}
            </div>

            {(watchCheckIn && watchCheckOut) ?
              <div>
                <div className="p-3 border-top">
                  <label>Full name:</label>
                  <input {...register('name')} type="text" className={"ms-0 mb-0 mt-1 border rounded-3 w-100 " + (errors.name ? 'form-control is-invalid' : '')} name="name" placeholder='John Doe' />
                  {errors.name ? <Error message={errors.name.message} /> : null}
                </div>
                <div className="p-3 border-top">
                  <label>Phone number:</label>
                  <input {...register('phoneNumber')} type="tel" className={"ms-0 mb-0 mt-1 border rounded-3 w-100 " + (errors.phoneNumber ? 'form-control is-invalid' : '')} name="phoneNumber" placeholder='089 000 0000' />
                  {errors.phoneNumber ? <Error message={errors.phoneNumber.message} /> : null}
                </div>
              </div>
              : null}
          </div>
          <button className={"book-button d-flex justify-content-center w-100 mt-2"} disabled={((user === null) || (user?.email === owner?.email)) ? true : false}>
            Book now&nbsp;
            {(getValues('checkIn') && getValues('checkOut')) ? <span>for ${calculateNumberOfNights() * price}</span>
              :
              null
            }
          </button>
        </form>
        {user === null ?
          <div className='p-2 m-1 mt-2 fs-5 text-center fw-normal'><Link to='/login' className='text-reset'>Log in</Link> to your account to book this place!</div>
          :
          null
        }
        {user?.email === owner?.email ?
          <div className='p-2 m-1 mt-2 fs-5 text-center fw-normal'>You can't book a place you are hosting!</div>
          :
          null
        }
      </div>
    </div>

  );

}
export default BookingForm;

