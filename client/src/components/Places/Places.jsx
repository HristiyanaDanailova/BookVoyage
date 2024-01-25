import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import axios from 'axios'

import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import "./Places.css";

import AccountNav from "../AccountNav/AccountNav";
import PlaceCard from "../PlaceCard/PlaceCard";
import { ReactComponent as Plus } from '../../assets/plus.svg'

const Places = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/place/user-places').then(({ data }) => {
      setPlaces(data.places);
      setLoading(false)
    }).catch(error => {
      let errorMessage = error.response.data.errors
        ? error.response.data.errors['errors'][0].msg
        : error.response.data.message;
      toast.error(errorMessage, {
        position: "top-right",
        theme: 'light'
      });
    });
  }, []);

  if (loading) {
    return 'Loading...'
  }
  return (
    <div>
      <AccountNav />
      <div className="justify-content-center">
        <Link to={'/account/places/new'} className="add-place-button d-flex justify-content-center link-underline link-underline-opacity-0 position-absolute start-50 translate-middle mt-5 ">
          <Plus width="25" height="25" fill="currentColor" className="mt-1 me-2" />
          Add new place
        </Link>
      </div>

      <div className="places-list">

        {places.length > 0
          ? places.map(place =>
            <PlaceCard place={place} key={place._id} />
          )
          : <div className="d-flex justify-content-center fs-3 text-black-50 lead">
            No places added yet. Share your accommodations with other users that love traveling and new experences!
          </div>
        }
      </div>

    </div>
  )
};

export default Places
