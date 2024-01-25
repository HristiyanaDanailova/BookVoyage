import { useEffect, useState } from 'react';

import ReactPaginate from 'react-paginate';

import './HomePlaceCards.css'

import HomePlaceCard from '../HomePlaceCard/HomePlaceCard'
import { ReactComponent as Globe } from '../../assets/globe.svg'

const PlaceCard = ({ places }) => {
    const [currentPlaces, setCurrentPlaces] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [placesOffset, setPlacesOffset] = useState(0);
    const placesPerPage = 8;

    useEffect(() => {
        const endOffset = placesOffset + placesPerPage;
        setCurrentPlaces(places.slice(placesOffset, endOffset));
        setPageCount(Math.ceil(places.length / placesPerPage));
    }, [placesOffset, placesPerPage, places]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * placesPerPage) % places.length;
        setPlacesOffset(newOffset);
    }

    return (
        <div className="container fade-in-style">
            <div className="row ">
                {
                    currentPlaces.length > 0
                        ?
                        currentPlaces.map(place =>
                            <HomePlaceCard place={place} key={place._id} />

                        )
                        :
                        <div className='d-flex shadow-lg p-4 position-absolute top-50 start-50 translate-middle no-match-width'>
                            <div className='d-flex flex-column justify-content-center p-4 fs-5'>
                                No results match your search criteria.
                                <span className='fs-6'>Try modifying your search</span>
                            </div>
                            <div className='pt-2 pe-2 ps-2'><Globe width="90" height="90" /></div>
                        </div>
                }
            </div>
            <ReactPaginate
                breakLabel='...'
                nextLabel='next >'
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                pageCount={pageCount}
                previousLabel='< previous'
                renderOnZeroPageCount={null}
                containerClassName='pagination'
                pageLinkClassName='page-num'
                previousLinkClassName='page-num'
                nextLinkClassName='page-num'
                activeLinkClassName='active'
            />
        </div>
    )
}
export default PlaceCard;

