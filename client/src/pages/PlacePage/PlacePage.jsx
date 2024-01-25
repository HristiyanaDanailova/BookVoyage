import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import axios from 'axios';

import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet'
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css'

import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import './PlacePage.css'

import MapFeature from '../../components/MapFeature/MapFeature';
import BookingForm from '../../components/BookingForm/BookingForm';
import PlaceGallery from '../../components/PlaceGallery/PlaceGallery';
import { ReactComponent as GeoAlt } from '../../assets/geo-alt.svg'
import { ReactComponent as PersonLock } from '../../assets/person-lock.svg'
import { ReactComponent as ChevronRight } from '../../assets/chevron-right.svg'
import { ReactComponent as X } from '../../assets/x.svg'
import HostInformation from '../../components/HostInformation/HostInformation';

const PlacePage = () => {
    const { id } = useParams();
    const [place, setPlace] = useState('');
    const [showDescription, setShowDescription] = useState(false);
    const [loading, setLoading] = useState(true)
    const [lat, setLat] = useState('');
    const [lon, setLon] = useState('');
    const [showMap, setShowMap] = useState(true)


    const customIcon = new Icon({
        iconUrl: 'https://www.svgrepo.com/show/513450/location-pin.svg',
        iconSize: [38, 38],
    })

    useEffect(() => {
        if (id) {
            axios.get('/place/places/' + id).then(({ data }) => {
                setPlace(data.place);
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
        }

    }, []);
    useEffect(() => {
        if (place.address) {
            const url = `https://api.geoapify.com/v1/geocode/search?text=${place.address}&format=json&apiKey=725c1e1dd8614efea3816aa8a76e3c3f`
            fetch(url).then(res => res.json()).then(data => {
                setLat(data.results[0].lat);
                setLon(data.results[0].lon);
            })
                .catch(error =>
                    toast.error(error, {
                        position: "top-right",
                        theme: 'light'
                    })
                );

        }
    }, [place])

    if (loading) {
        return 'Loading...'
    }
    return (
        <div className='place-page-content'>
            <div className='fs-2 text-margin'>{place.name}</div>
            <a target="_blank" rel='noreferrer' href={'https://maps.google.com/?q=' + place.address} className='fs-6 fw-bold text-dark text-margin'>
                <GeoAlt width="18" height="18" fill="currentColor" className="me-1 mb-1" />
                {place.address}
            </a>

            <PlaceGallery photos={place.photos} setShowMap={setShowMap} showMap={showMap} />

            <div className='container'>
                <div className='row'>
                    <div className='col col-7 d-flex flex-column align-self-baseline'>
                        <div className='details-font-size mt-auto pt-3 rounded-3 '>
                            <div className='details-font-size mt-auto pt-3 rounded-3 border-bottom line-width-house-rules pb-3'>
                                <h6 className='d-flex'>
                                    {place.owner?.profilePhoto
                                        ?
                                        <div><img src={'http://localhost:4000/uploads/' + place.owner?.profilePhoto} alt="" className='profile-photo-size' /></div>
                                        :
                                        <div className='rounded-circle bg-secondary-subtle p-3 shadow-sm'><PersonLock width="27" height="27" /></div>
                                    }
                                    <div className='ps-2 pt-1 fs-5'>Hosted by: {place.owner?.name}<br></br>
                                        <div className='fs-6 text-secondary'>{place.owner?.email}</div>
                                    </div>
                                </h6>
                            </div>


                        </div>
                        <div className='mt-4 description-font-size me-2'>

                            {showDescription ? place.description : `${place.description?.substring(0, 150)}${place.description?.length > 150 ? '...' : ''}`}
                            {place.description?.length > 150
                                ?
                                <p className='pt-3'>
                                    <button onClick={() => setShowDescription(!showDescription)} className='border border-0 border-bottom border-black p-0 fw-semibold bg-white pe-1 fs-6'>{showDescription ? 'Hide' : 'Show more'}
                                    </button>
                                    {showDescription ? <X width="22" height="22" /> : <ChevronRight />}

                                </p>
                                :
                                null
                            }

                        </div>
                        <div className='details-font-size mt-auto pt-3 rounded-3 border-top line-width-house-rules'>
                            <h4> House rules </h4>
                            <div><span className='fw-medium'>Check-in: </span>{place.checkIn}</div>
                            <div><span className='fw-medium'>Check-out: </span>{place.checkOut}</div>
                            <div><span className='fw-medium'>Max number of guests: </span>{place.maxGuests}</div>
                        </div>
                    </div>

                    <div className='col col-5 mt-3'>
                        <BookingForm price={place.price} id={id} booked={place.booked} maxGuests={place.maxGuests} owner={place.owner} />
                    </div>


                </div>

            </div>
            <div className='ms-2 mt-4 border-top'>
                <h4 className='ps-2 pt-3 pb-2'>What this place offers</h4>
                {place.features?.length > 0 ?
                    <div className='container'>
                        <div className='row row-cols-2'>
                            {place.features.map((feature, index) =>
                                <div className='col-4' key={`${index}-${feature}`}>
                                    <MapFeature feature={feature} width="32" height="32" classNameWrapperDiv='d-flex inline align-items-center mt-2 gap-3 fs-6' />
                                </div>
                            )}
                        </div>
                    </div>
                    :
                    null
                }
            </div>
            <div className='ms-2 mt-4 border-top'>
                <h4 className='mt-2 mb-4'>Where you'll be</h4>
                {
                    (lat !== '' && lon !== '')
                        ?
                        <div className={'opacity-' + (showMap === true ? '100' : '0')}>
                            <MapContainer center={[lat, lon]} zoom={17}>
                                <TileLayer attribution='CartoDB.Voyager'
                                    url=" https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                                />
                                <Marker position={[lat, lon]} icon={customIcon}
                                >
                                    <Popup><div>Exact location provided after booking.</div></Popup>
                                </Marker>
                            </MapContainer></div>


                        : null
                }
            </div>
            <div className='ms-2 mt-4 border-top'>
                <h4 className='mt-2'>Extra Info</h4>
                <div className='extraInfo-text'>{place.extraInfo ? place.extraInfo : 'No aditional information has been provided. Contact the host for more details about this place.'}</div>
            </div>
            
            <HostInformation owner={place.owner} />
        </div>
    )
}
export default PlacePage
/* */
