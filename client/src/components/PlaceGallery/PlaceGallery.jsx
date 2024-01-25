
import { useState } from 'react';

import './PlaceGallery.css';

import { ReactComponent as X } from '../../assets/x.svg'
import { ReactComponent as Images } from '../../assets/images.svg'

const PlaceGallery = ({ photos, setShowMap = undefined, showMap = undefined }) => {

    const [showAllPhotos, setShowAllPhotos] = useState(false);

    function toggleShowAllPhotos() {
        setShowAllPhotos(!showAllPhotos);
        if (setShowMap !== undefined) {
            setShowMap(!showMap)
        }
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }

    if (showAllPhotos) {
        return (
            <div>
                {photos?.length > 0
                    ?
                    (
                        <div className='place-more-photos'>
                            <div className='container place-more-photos-container position-relative'>

                                <button onClick={toggleShowAllPhotos} className='close-photos-button rounded'>
                                    <X width="22" height="22" fill="currentColor" className="pb-1" />
                                    Close photos</button>
                                {
                                    photos?.map(photo =>
                                        <div className='row' key={photo}>
                                            <div className='col col-12'>
                                                <img src={"http://localhost:4000/uploads/" + photo} alt="" className='place-more-photos-format mb-4 rounded-3' />
                                            </div>
                                        </div>
                                    )}
                            </div>
                        </div>
                    )
                    :
                    null}
            </div>
        )
    }

    return (
        <div className="container pt-4">
            <div className='row'>
                <div className='col col-8 '>
                    <img onClick={toggleShowAllPhotos} src={'http://localhost:4000/uploads/' + photos?.[0]} alt="" role='button' className='object-fit-cover rounded-4 place-cover-photo' />
                </div>
                <div className='col col-4'>
                    <div className='row justify-content-center'>
                        <div className='col col-12'>
                            <img onClick={toggleShowAllPhotos} src={'http://localhost:4000/uploads/' + photos?.[1]} alt="" role='button' className='img-fluid place-side-photo rounded-4' />
                        </div>
                    </div>
                    <div className='row justify-content-center'>
                        <div className='col col-12 position-relative'>
                            <img onClick={toggleShowAllPhotos} src={'http://localhost:4000/uploads/' + photos?.[2]} alt="" role='button' className='img-fluid place-side-photo mt-3 rounded-4' />
                            <button onClick={toggleShowAllPhotos} className='position-absolute bottom-0 end-0 me-4 mb-3 p-2 bg-white rounded border border-0 shadow'>
                                <Images width="25" height="25" fill="currentColor" className="pe-2" />
                                Show more photos</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )

}
export default PlaceGallery
