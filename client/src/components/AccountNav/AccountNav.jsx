import { Link, useLocation } from "react-router-dom";

import './AccountNav.css'

import { ReactComponent as Person } from '../../assets/person.svg'
import { ReactComponent as ListTask } from '../../assets/list-task.svg'
import { ReactComponent as Houses } from '../../assets/houses.svg'

const AccountNav = () => {
  const { pathname } = useLocation();
  let subpage = pathname.split('/')?.[2];

  if (subpage === undefined) {
    subpage = 'profile';
  }

  function linkClasses(type = null) {
    let classes = "p-2 link-underline link-underline-opacity-0 text-black inline rounded-pill ps-3 pe-4 bg-body-secondary";
    if (type === subpage) {
      classes = "p-2 link-underline link-underline-opacity-0 ps-4 pe-4 custom-color rounded-pill inline";
    }
    return classes;
  }

  return (
    <div>
      <nav className="d-flex justify-content-center gap-3 pt-2 mb-3">
        <Link to={"/account"} className={linkClasses("profile")}>
          <Person width="28" height="28" fill="currentColor" className="m-1 me-2" />
          My profile
        </Link>
        <Link to={"/account/bookings"} className={linkClasses("bookings")}>
          <ListTask width="28" height="28" fill="currentColor" className="m-1 me-2" />
          My bookings
        </Link>
        <Link
          to={"/account/places"}
          className={linkClasses("places")}>
          <Houses width="28" height="28" fill="currentColor" className="m-1 me-2" />
          My accommodations
        </Link>
      </nav>
    </div>
  )
}
export default AccountNav