import './FeaturesGadget.css'

import MapFeature from '../MapFeature/MapFeature'
import { ReactComponent as ChevronLeft } from '../../assets/chevron-left.svg'
import { ReactComponent as ChevronRight } from '../../assets/chevron-right.svg'

const FeaturesGadget = ({ features, handleFeatureSelect, selectedFeature }) => {

  const featuresHalf = Math.ceil(features.length / 2);

  function selectedClassName(feature) {
    let classes = 'feature-button';
    if (feature === selectedFeature) {
      classes = 'feature-button-clicked';
    }
    return classes;
  }

  return (

    <div className='d-flex justify-content-center pb-4'>
      <div id="carouselExample" className="carousel slide carousel-width">
        <button className='rounded-circle p-1 position-absolute top-50 start-0 translate-middle bg-white border border-secondary-subtle gadget-button-hover' type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <ChevronLeft width="25" height="20" className="pb-1" />
        </button>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className='d-flex inline fs-6 d-flex justify-content-around ps-3 pe-3'>
              {features?.length > 0 ?
                features.slice(0, featuresHalf).map((feature, index) =>
                  <button onClick={() => handleFeatureSelect(feature)} className={selectedClassName(feature)} id={'id-' + feature} key={`${index}-${feature}`}>
                    <MapFeature feature={feature} width='30' height='30' classNameSVG='pb-1' classNameWrapperDiv='d-flex flex-column ps-2 pe-2 pt-3 align-items-center p-2' />
                  </button>

                ) :
                null}

            </div>
          </div>
          <div className="carousel-item">
            <div className='d-flex inline fs-6 d-flex justify-content-around ps-3 pe-3'>
              {features?.length > 0
                ?
                features.slice(featuresHalf).map((feature, index) =>
                  <button onClick={() => handleFeatureSelect(feature)} className={selectedClassName(feature)} id={'id-' + feature} key={`${index}-${feature}`}>
                    <MapFeature feature={feature} width='30' height='30' classNameSVG='pb-1' classNameWrapperDiv='d-flex flex-column ps-3 pe-2 pt-3 align-items-center p-2' />
                  </button>
                )
                :
                null
              }
            </div>
          </div>
        </div>
        <button className='rounded-circle p-1 position-absolute top-50 start-100 translate-middle bg-white border border-secondary-subtle gadget-button-hover' type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <ChevronRight width="25" height="20" className="pb-1" />
        </button>
      </div>
    </div>)
}
export default FeaturesGadget
