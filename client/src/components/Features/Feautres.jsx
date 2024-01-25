import { useFormContext } from 'react-hook-form'

import './Features.css'

import MapFeature from '../MapFeature/MapFeature'

const Features = ({ features }) => {
  const { setValue, getValues, watch } = useFormContext();
  const watchFeatures = watch('features');

  function handleClick({ target }) {
    const { checked, name } = target;
    if (checked) {
      setValue('features', [...getValues('features'), name]);
    } else {
      setValue('features', [...getValues('features').filter(feature => feature !== name)]);
    }
  };

  return (
    <div className="row gap-4 p-3">
      {
        features?.length > 0
          ?
          features.map(feature =>
            <label className="d-flex inline border rounded gap-2 col-sm-6 col-md-4 col-lg-2" key={feature}>
              {watchFeatures && <input type="checkbox" onChange={handleClick} checked={getValues('features').includes(feature)} name={feature}></input>
              }
              <MapFeature feature={feature} width="27" height="27" classNameWrapperDiv='d-flex inline align-items-center mt-2 gap-2' />
            </label>
          )
          :
          null
      }
    </div>

  )
}
export default Features
