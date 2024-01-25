import { useState, useEffect } from 'react'

import axios from 'axios'

import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import './Profile.css'

import ProfileModal from '../ProfileModal/ProfileModal'
import { ReactComponent as Quote } from '../../assets/quote.svg'
import { ReactComponent as Case } from '../../assets/case.svg'
import { ReactComponent as House } from '../../assets/house.svg'

const Profile = ({ logout }) => {
  const [user, setUser] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/user/profile-info').then(({ data }) => {
      if (data.user) {
        setUser(data.user);
        setProfilePhoto(data.user.profilePhoto);
        setLoading(false);
      }
    }).catch(error => {
      let errorMessage = error.response.data.errors
        ? error.response.data.errors['errors'][0].msg
        : error.response.data.message;
      toast.error(errorMessage, {
        position: "top-right",
        theme: 'light'
      });
    });
  }, [user, profilePhoto])

  async function uploadProfilePhoto({ target }) {
    try {
      let data = new FormData();
      data.append('photos', target.files[0]);
      //upload profile photo
      const res = await axios.post('/photo/upload-photo', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const profilePhoto = res.data.photos[0];
      // update user information
      await axios.put('/user/profilePhoto', {
        id: user._id,
        profilePhoto
      });
      setProfilePhoto(profilePhoto)
      setUser({ ...user, profilePhoto });
    } catch (error) {
      let errorMessage = error.response.data.errors.length === 0
        ? error.response.data.message
        : error.response.data.errors['errors'][0].msg;
      toast.error(errorMessage, {
        position: "top-right",
        theme: 'light'
      });
    }

  }

  if (loading) {
    return 'Loading...'
  }
  return (
    <div className="d-flex justify-content-center mt-4">

      <div className="w-75 shadow-lg">
        <div className="container">
          <div className="row p-3">
            <div className="col col-5 pb-3 d-flex flex-column justify-content-center border-end border-secondary-subtle">
              <div className=" d-flex flex-column align-items-center border-bottom border-secondary-subtle p-2 pb-2" >
                {profilePhoto
                  ?
                  <img className="rounded-circle mt-2 img-fluid object-fit-cover shadow-sm profile-image" alt="avatar1" src={'http://localhost:4000/uploads/' + profilePhoto} />
                  :
                  <img className="rounded-circle mt-2 img-fluid object-fit-cover shadow profile-image" alt="avatar1" src={'http://localhost:4000/uploads/default-profile.jpg'} />
                }
                <div className='mt-2 mb-2'>
                  <label className='border-0 bg-transparent update-photo-button'>Update photo
                    <input type='file' hidden onChange={(event) => uploadProfilePhoto(event)} />
                  </label>
                </div>
              </div>
              <div className=' lead ms-2'>
                <div className="d-flex fs-5 fw-normal mt-3 text-black-50 ">Names:&nbsp;{user.name ? <span className='text-black'>{user.name}</span> : <span className='fs-5 text-black-50'>No information</span>}</div>
                <div className="d-flex fs-5 fw-normal mt-2 text-black-50">E-mail address:&nbsp;{user.email ? <span className='text-black'>{user.email}</span> : <span className='fs-5 text-black-50'>No information</span>}</div>
                <div className="d-flex fs-5 fw-normal mt-2 text-black-50">Phone number:&nbsp;{user.phoneNumber ? <span className='text-black'>{user.phoneNumber}</span> : <span className='fs-5 text-black-50'>No information</span>}</div>
              </div>
              <div className='mt-auto d-flex justify-content-around'>
                <button className="p-2 mt-3 me-2 update-profile-button w-50" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Update profile</button>
                <button className="p-2 mt-3 me-5 logout-button w-50" onClick={logout}>Logout</button>
              </div>

              <ProfileModal user={user} setUser={setUser} />
            </div>
            <div className="col col-7 d-flex flex-column pb-2 ps-4">
              <div className=' fs-3 lead  mt-3'>
                Hi, I am {user.name}!
              </div>
              <div className='pt-3'><Quote width="52" height="52" /></div>
              {user.description
                ?
                <div className='pt-3 fs-5 text-break'>{user.description}</div>
                :
                <div className='pt-3 fs-5 text-black-50 fw-normal'>No description added yet.<br /> Maybe you can share something more about yourself? </div>
              }

              <div className='mt-auto'>
                <div className=' mt-3 d-flex'>
                  &nbsp;<House width="25" height="25" className="" />
                  <div className='fs-5 fw-normal'>&nbsp;
                    Lives in&nbsp;{user.address ? <span className='text-black'>{user.address}</span> : <span className='fs-5 text-black-50'>No information</span>}
                  </div>
                </div>
                <div className=' mt-2 d-flex'>
                  <Case width="38" height="38" className="pe-1" />
                  <div className='fs-5 fw-normal' >
                    Works as&nbsp;{user.profession ? <span className='text-black'>{user.profession}</span> : <span className='fs-5 text-black-50'>No information</span>}
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>


    </div>
  )
}
export default Profile
