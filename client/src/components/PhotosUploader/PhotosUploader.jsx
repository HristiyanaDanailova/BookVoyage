import { useState } from "react";

import { useFormContext } from "react-hook-form";

import axios from "axios";

import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import './PhotosUploader.css'

import { ReactComponent as Star } from '../../assets/star.svg';
import { ReactComponent as StarFill } from '../../assets/star-fill.svg';
import { ReactComponent as Trash } from '../../assets/trash.svg';
import { ReactComponent as Upload } from '../../assets/upload.svg';

const PhotosUploader = () => {
  const [photoLink, setPhotoLink] = useState('')
  const { setValue, getValues, watch } = useFormContext();
  const watchPhotos = watch('photos', []);

  async function addPhotoLink(event) {
    event.preventDefault();
    try {
      if (photoLink.match(/\.(jpeg|jpg|png)$/) === null) {
        toast.error('All links should end with: .png/jpeg/jpg', {
          position: "top-right",
          theme: 'light'
        });
        return 0;
      }
      const { data } = await axios.post('/photo/upload-photo-by-link', { link: photoLink });
      setValue('photos', [...getValues('photos'), data.image])
      setPhotoLink('');
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
  async function removePhoto(event, photoLink) {
    event.preventDefault();
    try {
      await axios.delete('/photo/delete-photo/' + photoLink);
      setValue('photos', [...getValues('photos').filter(photo => photo !== photoLink)]);
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

  function selectAsCover(event, photoLink) {
    event.preventDefault();
    setValue('photos', [photoLink, ...getValues('photos').filter(photo => photo !== photoLink)])
  }

  async function uploadPhoto(target) {
    try {
      const files = target.files;
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      const validFiles = Object.values(files).filter(f => allowedTypes.includes(f.type));
      if (validFiles.length !== files.length) {
        toast.error('All files should be of format: .png/jpeg/jpg',
          {
            position: "top-right",
            theme: 'light'
          });
        return 0;
      }
      const data = new FormData();
      for (let i = 0; i < validFiles.length; i++) {
        data.append('photos', validFiles[i]);
      }
      const { data: res } = await axios.post('/photo/upload-photo', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setValue('photos', getValues('photos').concat(res.photos));
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
      <div className="d-flex">
        <input className="w-100 ms-0" type="text" name="photoLink" value={photoLink} onChange={({ target }) => setPhotoLink(target.value)} placeholder={'Link to an image'}></input>
        <button className="rounded border border-secondary-subtle bg-body-secondary p-1 add-photo-button ps-3 pe-3" onClick={(event) => addPhotoLink(event)}>Grab&nbsp;photo</button>
      </div>
      <div className="row">
        <div className="col col-sm-3 col-3 rounded mt-2 d-flex w-100">
          <label id="upload-file-button" className="rounded p-5 border border-secondary-subtle bg-body-secondary fs-5" >
            <input type="file" multiple hidden onChange={({ target }) => uploadPhoto(target)} />
            <Upload width="22" height="22" fill="currentColor" className="pb-1 pe-1" />
            Upload
          </label>
        </div>
        {watchPhotos && getValues('photos')?.length > 0
          ?
          getValues('photos').map(photoLink => (
            <div className="col col-sm-3 col-3 rounded mt-2 d-flex position-relative" key={photoLink}>
              <img src={'http://localhost:4000/uploads/' + photoLink} className="w-100 rounded object-fit-cover uploaded-img-places" alt="" />
              <button onClick={(event) => removePhoto(event, photoLink)} className="position-absolute bottom-0 end-0 me-3 mb-2 bg-dark opacity-75 p-1 pb-2 rounded action-icon">
                <Trash width="22" height="22" fill="white" />
              </button>
              <button onClick={(event) => selectAsCover(event, photoLink)} className="position-absolute bottom-0 start-0 ms-3 mb-2 bg-dark opacity-75 p-1 pb-2 rounded action-icon">
                {
                  photoLink === getValues('photos')[0]
                    ?
                    <StarFill width="22" height="22" fill="white" />
                    :
                    <Star width="22" height="22" fill="white" />
                }
              </button>
            </div>
          ))
          :
          null
        }
      </div>
    </div>
  )
}
export default PhotosUploader
