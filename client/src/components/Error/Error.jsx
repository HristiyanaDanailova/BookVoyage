import './Error.css'

import { ReactComponent as ErrorIcon } from '../../assets/error.svg';

const Error = ({ message, classNameError }) => {
  return (
    <div className={'text-danger rounded d-flex align-items-center pb-2 pt-2 ' + classNameError}>
      <div className='ps-1 message-color'>
        <ErrorIcon width="25" height="25" fill="red" /> {message}
      </div>
    </div>
  )
}
export default Error