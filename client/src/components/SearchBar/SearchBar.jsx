import { useState } from 'react';

import { createSearchParams, useNavigate, useLocation } from 'react-router-dom';

import { format } from 'date-fns'

import './SearchBar.css';

import { ReactComponent as Seacrh } from '../../assets/search.svg';
import { ReactComponent as X } from '../../assets/x.svg';

const SearchBar = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [destination, setDestination] = useState(queryParams.get('destination') || '');
    const [checkIn, setCheckIn] = useState(queryParams.get('checkIn') || '');
    const [checkOut, setCheckOut] = useState(queryParams.get('checkOut') || '');
    const [guests, setGuests] = useState(queryParams.get('guests') || '');
    const navigate = useNavigate();

    function removeDates() {
        setCheckIn('');
        setCheckOut('');
    }
    async function submitSearch(event) {
        event.preventDefault();
        navigate({
            pathname: '/',
            search: createSearchParams({ destination, checkIn, checkOut, guests }).toString()
        });
        window.location.reload();
    }

    return (<form onSubmit={(event) => submitSearch(event)} autoComplete="off">
        <div className="shadow d-flex gap-2 border border-2 rounded-pill p-1" id="navbar-searchbar">

            <div className="p-1 ms-2 fw-medium text-black">
                <input value={destination} onChange={({ target }) => { setDestination(target.value) }} className='border border-0 m-0 p-1 ps-2  fw-medium' id='input-destination-search-bar' type="text" placeholder='Anywhere?' />
            </div>
            <div className="border border-end" />
            <div className="p-2 fw-medium">
                <button type="button" className="border border-0 m-0 p-0 fw-medium bg-white text-black-50 dates-button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                    <div className='dates-text'>
                        {checkIn && checkOut ? `${format(new Date(checkIn), "dd/MM/yyyy")}...` :
                            (checkIn && checkOut === '' ?
                                `${format(new Date(checkIn), "dd/MM/yyyy")}`
                                :
                                (checkIn === '' && checkOut
                                    ? `${format(new Date(checkOut), "dd/MM/yyyy")}`
                                    :
                                    'Any week?'
                                ))
                        }</div>
                </button>
                <div className="collapse position-absolute z-3 collapse-dates shadow-lg" id="collapseExample">
                    <div className="card card-body">
                        {checkIn && checkOut
                            ?
                            <div className=' d-flex justify-content-center lead fs-5 ps-3'>
                                <span className='fw-normal'>{format(new Date(checkIn), "dd/MM/yyyy")}</span>&nbsp;to&nbsp;<span className='fw-normal'>{format(new Date(checkOut), "dd/MM/yyyy")}</span>
                                <button className='border border-0 rounded-circle ps-1 pe-1 ms-2 bg-body-tertiary' onClick={() => removeDates()}>
                                    <X width='27' height='27' className="pb-1" />
                                </button>
                            </div>
                            :
                            (checkIn && checkOut === '')
                                ?
                                <div className='d-flex justify-content-center lead fs-5'><span className='fw-normal'>from&nbsp;{format(new Date(checkIn), "dd/MM/yyyy")}</span></div>
                                :
                                (checkIn === '' && checkOut)
                                    ?
                                    <div className='d-flex justify-content-center lead fs-5'>to&nbsp;<span className='fw-normal'>{format(new Date(checkOut), "dd/MM/yyyy")}</span></div>
                                    :
                                    null

                        }
                        <div className="d-flex pt-2">
                            <div className="p-3">
                                <label>Check in:</label>
                                <input value={checkIn} min={format(new Date(), 'yyyy-MM-dd')} max={checkOut ? format(new Date(checkOut), 'yyyy-MM-dd') : '2035-01-01'} onChange={({ target }) => { setCheckIn(target.value) }} type="date" className={"border border-0 "} name="checkIn" />

                            </div>
                            <div className="p-3 border-start">
                                <label>Check out:</label>
                                <input value={checkOut} min={checkIn ? format(new Date(checkIn), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd')} onChange={({ target }) => { setCheckOut(target.value) }} type="date" className={"border border-0 "} name="checkOut" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="border border-end" />
            <div className="p-1">
                <input value={guests} onChange={({ target }) => { setGuests(target.value) }} min={1} max={50} className='border border-0 m-0 p-1 ps-2 text-black fw-medium' id='input-guests-search-bar' type="number" placeholder='Add guests' />
            </div>
            <button className="custom-color-searchbar rounded-circle p-2 border-0">
                <Seacrh width="22" height="16" fill="white" />
            </button>

        </div>
    </form>

    )
}
export default SearchBar
