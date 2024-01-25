import { useForm } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import axios from 'axios'

import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import './ProfileModal.css'

import Error from '../Error/Error';

const validationSchema = yup.object({
  name: yup.string().required('Name is a required field').min(2, 'Name should be at least 2 symbols long').max(256, 'Name can\'t be more than 256 symbols long'),
  email: yup.string().required('Email is a required field').email('Invalid email address'),
  phoneNumber: yup.string().required('Phone number is a required field').matches(/^[0-9]{10}$/, 'Invalid phone number'),
  description: yup.string().max(1024, 'Description can\'t be longer than 1024 symbols'),
  address: yup.string().max(256, 'Address can\'t be longer than 256 symbols'),
  profession: yup.string().max(256, 'Profession can\'t be longer than 256 symbols')
}).required();

const ProfileModal = ({ user, setUser }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    values: {
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      description: user.description,
      address: user.address,
      profession: user.profession
    }
  });

  async function updateUser(data) {
    const id = user._id;
    try {
      await axios.put('/user/update-user', { ...data, id });
      setUser({ ...data, id });
      toast.success('You have successfully updated your profile information! :)')
      window.$('#exampleModal').modal('toggle');
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

  return (
    <div>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 " id="exampleModalLabel">Personal information</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="d-flex flex-column align-items-center" onSubmit={handleSubmit(updateUser)}>
                <div>
                  <label className="text-black-50 ms-3">Names</label>
                  <input {...register('name')} className={"profile-modal-input mt-1 mb-2 " + (errors.name ? 'form-control is-invalid' : '')} type="text" placeholder="Name" name="name" />
                  {errors.name ? <Error message={errors.name.message} /> : null}
                </div>
                <div>
                  <label className="text-black-50 ms-3">E-mail address</label>
                  <input {...register('email')} className={"profile-modal-input mt-1 mb-2 " + (errors.email ? 'form-control is-invalid' : '')} type="email" placeholder="Email" name="email" />
                  {errors.email ? <Error message={errors.email.message} /> : null}
                </div>
                <div>
                  <label className="text-black-50 ms-3">Phone number</label>
                  <input {...register('phoneNumber')} type="tel" className={"profile-modal-input mt-1 mb-2 " + (errors.phoneNumber ? 'form-control is-invalid' : '')} name="phoneNumber" placeholder='' />
                  {errors.phoneNumber ? <Error message={errors.phoneNumber.message} /> : null}

                </div>
                <div>
                  <label className="text-black-50 ms-3">How would you describe yourself?</label>
                  <textarea {...register('description')} className={"profile-modal-input mt-1 mb-2 " + (errors.description ? 'form-control is-invalid' : '')} rows="1" type="text" placeholder="" name="description" />
                  {errors.description ? <Error message={errors.description.message} /> : null}
                </div>
                <div>
                  <label className="text-black-50 ms-3">Where do you live?</label>
                  <input {...register('address')} className={"profile-modal-input mt-1 mb-2 " + (errors.address ? 'form-control is-invalid' : '')} type="text" placeholder="" name="address" />
                  {errors.address ? <Error message={errors.address.message} /> : null}
                </div>
                <div>
                  <label className="text-black-50 ms-3">What is your profession?</label>
                  <input {...register('profession')} className={"profile-modal-input mt-1 " + (errors.profession ? 'form-control is-invalid' : '')} type="text" placeholder="" name="profession" />
                  {errors.profession ? <Error message={errors.profession.message} /> : null}
                </div>
                <div className="modal-footer">
                  <button type="button" className="profile-modal-button close-button" data-bs-dismiss="modal" >Close</button>
                  <button type="submit" className="profile-modal-button" >Save</button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileModal