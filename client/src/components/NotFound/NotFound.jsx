import { ReactComponent as ErrorPage } from "../../assets/error-page.svg"

const NotFound = () => {
    return (
        <div className='d-flex shadow-lg p-4 position-absolute top-50 start-50 translate-middle no-match-width'>
            <div className='d-flex flex-column justify-content-center p-4 fs-4'>
                Oops!...
                <span className='fs-5'>Page not found! Are you sure the website URL is correct?</span>
            </div>
            <div className='pt-3 pe-2 ps-2'><ErrorPage width="110" height="110" /></div>
        </div>
    )
}

export default NotFound