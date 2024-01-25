import { useEffect, useState } from 'react'

import { Link } from 'react-router-dom';

import axios from 'axios';
import { differenceInCalendarDays } from 'date-fns'

import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import './Bookings.css';

import AccountNav from '../../components/AccountNav/AccountNav'
import BookingCard from '../../components/BookingCard/BookingCard';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/booking/all-bookings').then(({ data }) => {
            setBookings(data.bookings);
            setLoading(false);

        }).catch(error => {
            let errorMessage = error.response.data.errors
                ? error.response.data.errors['errors'][0].msg
                : error.response.data.message;
            toast.error(errorMessage, {
                position: "top-right",
                theme: 'light'
            });
        })
    }, [])

    const upcomingBookings = bookings.filter(booking => differenceInCalendarDays(new Date(booking.checkIn), new Date()) >= 0);
    const pastBookings = bookings.filter(booking => differenceInCalendarDays(new Date(booking.checkIn), new Date()) < 0)

    if (loading) {
        return 'Loading...'
    }
    return (

        <div>
            <AccountNav />
            {bookings.length > 0
                ?
                <div>
                    <div className='bookings-text'>
                        <div className='lead fs-2 lh-1 fw-normal ps-2 text-black-50'>Upcoming<hr className='w-25'></hr></div>
                        {upcomingBookings.length > 0 ?
                            upcomingBookings.map(booking =>
                                <BookingCard booking={booking} past={false} key={booking._id} />
                            ) :
                            <div className='fs-4 lead d-flex justify-content-center text-black-50'>
                                No upcoming trips. Book your next destination from&nbsp;
                                <Link to={'/'} className='link-underline-secondary link-underline-opacity-50 link-offset-1 text-black-50'>here</Link>.
                            </div>
                        }
                    </div>
                    <div className='lead fs-2 fw-normal ps-2 pt-3 lh-1 text-black-50'>Past<hr className='w-25'></hr></div>
                    <div className='bookings-text'>
                        {pastBookings.length > 0 ?
                            pastBookings.map(booking =>
                                <BookingCard booking={booking} past={true} key={booking._id} />
                            ) :
                            <div className='fs-4 lead d-flex justify-content-center text-black-50'>
                                No past trips.
                            </div>
                        }
                    </div>
                </div>
                :
                <div className='fs-4 lead d-flex justify-content-center text-black-50 mt-5'>
                    You haven't booked any trips yet. Find your next destination from&nbsp; <Link to={'/'} className='link-underline-secondary link-underline-opacity-50 link-offset-1 text-black-50'>here</Link>.
                </div>
            }
        </div>

    )
}
export default Bookings
