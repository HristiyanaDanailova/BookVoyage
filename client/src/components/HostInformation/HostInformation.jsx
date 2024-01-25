import { useState } from "react";


import { ReactComponent as PersonLock } from '../../assets/person-lock.svg'
import { ReactComponent as ChevronRight } from '../../assets/chevron-right.svg'
import { ReactComponent as X } from '../../assets/x.svg'
import { ReactComponent as Quote } from '../../assets/quote.svg';

const HostInformation = ({ owner }) => {
    const [showOwnerDescription, setOwnerDescription] = useState(false);
    return (
        <div>
            <div className='ms-2 mt-4 border-top'>
                <h4 className='mt-3'>Host information</h4>
                <div className='row mt-3 mb-4'>
                    <div className='col col-4 pt-2'>
                        <div className=''>
                            <h6 className='d-flex'>
                                {owner?.profilePhoto
                                    ?
                                    <div><img src={'http://localhost:4000/uploads/' + owner.profilePhoto} alt="" className='profile-photo-size' /></div>
                                    :
                                    <div className='rounded-circle bg-secondary-subtle p-3 shadow-sm'><PersonLock width="27" height="27" /></div>
                                }
                                <div className='ps-2 pt-3 fs-5'>{owner?.name}<br></br>
                                </div>
                            </h6>
                            <div className='extraInfo-text text-black fw-medium'>E-mail: <span className='fw-normal'>{owner?.email ? owner.email : 'No aditional information has been provided.'}</span></div>
                            <div className='extraInfo-text text-black fw-medium'>Phone number: <span className='fw-normal'>{owner?.phoneNumber ? `${owner.phoneNumber.slice(0, 7)}***` : 'No aditional information has been provided.'}</span></div>
                            {owner?.profession ? <div className='extraInfo-text text-black fw-medium'>Works as: <span className='fw-normal'>{owner.profession}</span></div> : null}
                            {owner?.address ? <div className='extraInfo-text text-black fw-medium'>Lives in: <span className='fw-normal'>{owner.address}</span></div> : null}
                        </div>
                    </div>

                    {owner?.description
                        ?
                        <div className='col col-8 border-start'>
                            <div className='extraInfo-text text-black p-4 ms-5 d-flex flex-column text-break'>
                                <div className='pb-2'><Quote width="24" height="24" /></div>
                                {showOwnerDescription ? owner?.description : `${owner.description.substring(0, 256)}${owner.description?.length > 256 ? '...' : ''}`}
                                {owner.description?.length > 256
                                    ?
                                    <p className='pt-3'>
                                        <button onClick={() => setOwnerDescription(!showOwnerDescription)} className='border border-0 border-bottom border-black p-0 fw-semibold bg-white pe-1 fs-6'>{showOwnerDescription ? 'Hide' : 'Show more'}
                                        </button>
                                        {showOwnerDescription ? <X width="22" height="22" /> : <ChevronRight />}

                                    </p>
                                    :
                                    null
                                }
                            </div>

                        </div>
                        :
                        null
                    }

                </div>

            </div>
        </div>
    )
}

export default HostInformation