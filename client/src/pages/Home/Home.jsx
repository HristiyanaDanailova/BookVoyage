import { useEffect, useState } from 'react'

import { useLocation } from 'react-router-dom'

import axios from 'axios'
import { areIntervalsOverlapping } from 'date-fns'

import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import './Home.css'

import FeaturesGadget from '../../components/FeaturesGadget/FeaturesGadget'
import HomePlaceCards from '../../components/HomePlaceCards/HomePlaceCards'
import { ReactComponent as GlobeLocation } from '../../assets/globe-location.svg'

const Home = ({ features }) => {
    let [places, setPlaces] = useState([]);
    const [selectedFeature, setSelectedFeature] = useState(localStorage.getItem('feature') || '');
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const destination = queryParams.get('destination');
    const checkIn = queryParams.get('checkIn');
    const checkOut = queryParams.get('checkOut');
    const guests = queryParams.get('guests');
    const [hasFetched, setHasFetched] = useState(false);


    function weekAvailability(place, start, end) {
        for (let booking of place.booked) {
            if (areIntervalsOverlapping({
                start: new Date(start),
                end: new Date(end)
            }, {
                start: new Date(booking.startDate),
                end: new Date(booking.endDate)
            })) {

                return false;
            }
        }
        return true
    }


    function handleFeatureSelect(feature) {
        if (selectedFeature === feature) {
            setSelectedFeature('');
            localStorage.removeItem('feature');
            window.$(`#id-${feature}`).blur();
        } else {
            setSelectedFeature(feature);
            localStorage.setItem('feature', feature)
        }
    }

    useEffect(() => {
        axios.get('/place/all-places').then(({ data }) => {
            let places = data.places;
            if (queryParams.size === 0) {
                setPlaces(places);
            } else {
                if (destination !== '') {
                    places = places.filter(place => place.address.toLowerCase().includes(destination.toLowerCase()));
                }
                if (checkIn !== '' && checkOut !== '') {
                    places = places.filter(place => weekAvailability(place, checkIn, checkOut));
                } else if (checkIn !== '' && checkOut === '') {
                    places = places.filter(place => weekAvailability(place, checkIn, checkIn));
                }
                else if (checkIn === '' && checkOut !== '') {
                    places = places.filter(place => weekAvailability(place, checkOut, checkOut));
                }
                if (guests !== '') {
                    places = places.filter(place => place.maxGuests >= guests);
                }
                setPlaces(places)
            }
            setHasFetched(true);
        }).catch(error => {
            let errorMessage = error.response.data.errors
                ? error.response.data.errors['errors'][0].msg
                : error.response.data.message;
            toast.error(errorMessage, {
                position: "top-right",
                theme: 'light'
            });
        });
    }, [])

    if (!hasFetched) {
        return 'Loading...'
    }
    return (
        <div>
            <div>
                <FeaturesGadget features={features} handleFeatureSelect={handleFeatureSelect} selectedFeature={selectedFeature} />
            </div>
            <div className='fade-in-style'>
                {
                    (places.length > 0) || queryParams.size > 0 ?
                        ((selectedFeature === '')
                            ?
                            <div><HomePlaceCards places={places} /></div>
                            :
                            <HomePlaceCards places={places.filter(place => place.features.includes(selectedFeature))} />)
                        :
                        <div className='d-flex shadow-lg p-4 position-absolute top-50 start-50 translate-middle no-match-width'>
                            <div className='d-flex flex-column justify-content-center p-4 fs-5'>
                                No places have been added yet.
                                <span className='fs-6'>Be the first to share your place with the world!</span>
                            </div>
                            <div className='pt-2 pe-2 ps-2'><GlobeLocation width="110" height="110" /></div>
                        </div>
                }

            </div>

        </div>


    )
}
export default Home
