import { useContext, useEffect, useState } from 'react';

import { Navigate, useParams } from 'react-router-dom';

import { useForm, FormProvider } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import axios from 'axios';

import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import './PlacesFormPage.css';

import Features from '../Features/Feautres';
import PhotosUploader from '../PhotosUploader/PhotosUploader';
import AccountNav from '../AccountNav/AccountNav';
import Error from '../Error/Error';
import { UserContext } from '../../userContext';

const validationSchema = yup.object({
  name: yup.string().required('Name is a required field').min(3, 'Name should be at least 3 symbols long').max(256, 'Name can\'t be more than 256 symbols long'),
  address: yup.string().required('Address is a required field').min(3, 'Address should be at least 3 symbols long').max(256, 'Address can\'t be more than 256 symbols long'),
  photos: yup.array().of(yup.string()).required('Photos is a required field').min(3, 'You should upload at least 3 photos').max(20, 'You can\'t upload more than 20 photos'),
  description: yup.string().required('Description is a required field').min(20, 'Description should be at least 20 symbols long').max(4096, 'Description can\'t be more than 4096 symbols long'),
  features: yup.array().of(yup.string()),
  extraInfo: yup.string().max(2048, 'Extra info can\'t be more than 2048 symbols long'),
  checkIn: yup.string().required('Check in is a required field'),
  checkOut: yup.string().required('Check out is a required field'),
  maxGuests: yup.number('').transform((value) => Number.isNaN(value) ? null : value).required('Max number of guests is a required field').min(1, 'Max number of guests can\'t be less than 1').max(50, 'Max number of guests can\'t be greater than 50'),
  price: yup.number().transform((value) => Number.isNaN(value) ? null : value).required('Price is a required field').min(1, 'Price can\'t be less than 1$').max(10000, 'Price can\'t be greater than 10 000$')

}).required();

const PlacesFormPage = ({ features: allFeatures }) => {
  const [formData, setFormData] = useState({});
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    values: formData
  })
  const { register, handleSubmit, formState: { errors }, getValues } = methods;


  useEffect(() => {
    // load place data for update
    if (id) {
      axios.get('/place/places/' + id).then(({ data }) => {
        setFormData(data.place);
      }).catch(error => {
        let errorMessage = error.response.data.errors
          ? error.response.data.errors['errors'][0].msg
          : error.response.data.message;
        toast.error(errorMessage, {
          position: "top-right",
          theme: 'light'
        });
      });
    } else {
      setFormData({
        name: '',
        address: '',
        description: '',
        photos: [],
        features: [],
        extraInfo: '',
        checkIn: '12:00',
        checkOut: '11:00',
        maxGuests: 2,
        price: 100
      })
    }
  }, [])

  const handleSubmitForm = async data => {
    if (id) {
      //update place
      try {
        await axios.put('/place/places', {
          id, ...data
        });
        toast.success('You have successfully updated your place information! :)')
        setRedirect(true);
      } catch (error) {
        let errorMessage = error.response.data.errors
          ? error.response.data.errors['errors'][0].msg
          : error.response.data.message;
        toast.error(errorMessage, {
          position: "top-right",
          theme: 'light'
        });
      }
    } else {
      //add new place
      try {
        await axios.post('/place/places', data);
        toast.success('You have successfully added your place! :)')
        setRedirect(true);
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
  }

  if (redirect) {
    return <Navigate to="/account/places" />
  }

  if (getValues('owner') !== undefined) {
    if (getValues('owner.email') !== user.email) {
      return <Navigate to='/' />
    }
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <h3 className="ps-2">Name</h3>
        <input {...register('name')} className={"w-100 ms-0 mb-1 " + (errors.name ? 'form-control is-invalid' : '')} type="text" name="name" placeholder="How is your place named?" />
        {errors.name ? <Error message={errors.name.message} /> : null}

        <h3 className="ps-2 mt-4">Address</h3>
        <input {...register('address')} className={"w-100 ms-0 mb-1 " + (errors.address ? 'form-control is-invalid' : '')} type="text" name="address" placeholder="What is the address of your place?" />
        {errors.address ? <Error message={errors.address.message} /> : null}

        <h2 className="ps-2 mt-4">Photos</h2>
        <p className="ps-2 text-black-50">How does your place look like?</p>
        <FormProvider {...methods}>
          <PhotosUploader />
          {errors.photos ? <Error message={errors.photos.message} /> : null}
        </FormProvider>
        <h3 className="ps-2 mt-4">Description</h3>
        <textarea {...register('description')} className={"w-100 ms-0 mb-0 " + (errors.description ? 'form-control is-invalid' : '')} name="description" placeholder="How would you describe your place?" />
        {errors.description ? <Error message={errors.description.message} /> : null}


        <h3 className="ps-2 pt-3">Features</h3>
        <p className="ps-2 text-black-50">What does your place offer?</p>
        <FormProvider {...methods}>
          <Features features={allFeatures} />
        </FormProvider>

        <h3 className="ps-2 pt-3">Extra info</h3>
        <textarea {...register('extraInfo')} className={"w-100 ms-0 mb-0 " + (errors.extraInfo ? 'form-control is-invalid' : '')} name="extraInfo" placeholder="What should your guests know? (house rules, cancellation policies, etc.)" />
        {errors.extraInfo ? <Error message={errors.extraInfo.message} /> : null}

        <h3 className="ps-2 pt-3">Important for your stay</h3>
        <div className="d-flex inline row me-5">
          <div className="col-sm-12 col-md-3 col-lg-3 pe-4">
            <label className="ms-4 ps-2 pt-2 fs-5">Check-in time</label>
            <input {...register('checkIn')} className={"w-100 ms-4 mb-0 " + (errors.checkIn ? 'form-control is-invalid' : '')} type="time" name="checkIn" />
            {errors.checkIn ? <Error message={errors.checkIn.message} /> : null}
          </div>
          <div className="col-sm-12 col-md-3 col-lg-3 pe-4">
            <label className="ms-4 ps-2 pt-2 fs-5">Check-out time</label>
            <input {...register('checkOut')} className={"w-100 ms-4 mb-0 " + (errors.checkOut ? 'form-control is-invalid' : '')} type="time" name="checkOut" />
            {errors.checkOut ? <Error message={errors.checkOut.message} /> : null}
          </div>
          <div className="col-sm-12 col-md-3 col-lg-3 pe-4">
            <label className="ms-4 ps-2 pt-2 fs-5">Max number of guests</label>
            <input {...register('maxGuests')} className={"w-100 ms-4 mb-0 " + (errors.maxGuests ? 'form-control is-invalid' : '')} type="number" name="maxGuests" />
            {errors.maxGuests ? <Error message={errors.maxGuests.message} className={'ms-4'} /> : null}
          </div>
          <div className="col-sm-12 col-md-3 col-lg-3">
            <label className="ms-4 ps-2 pt-2 fs-5">Price per night</label>
            <input {...register('price')} className={"w-100 ms-4 mb-0 " + (errors.price ? 'form-control is-invalid' : '')} type="number" name="price" />
            {errors.price ? <Error message={errors.price.message} className={'ms-4'} /> : null}

          </div>
        </div>
        <div>
          <button className="add-place-button w-100 mt-3">Save</button>
        </div>
      </form>
    </div>
  )

}

export default PlacesFormPage
