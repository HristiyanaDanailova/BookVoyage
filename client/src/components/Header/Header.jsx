import { useContext } from 'react';

import { Link } from 'react-router-dom';

import './Header.css'

import { UserContext } from '../../userContext';
import SearchBar from '../SearchBar/SearchBar';
import { ReactComponent as Luggage } from '../../assets/luggage.svg'
import { ReactComponent as List } from '../../assets/list.svg';
import { ReactComponent as PersonCircle } from '../../assets/person-circle.svg';

const Header = () => {
  const { user } = useContext(UserContext);
  return (

    <header>
      <nav className="navbar border-bottom p-4 pb-5">
        <div className="container">
          <div className="d-flex justify-content-between">
            {/*logo*/}
            <div className="p-1 d-flex justify-content-between">
              <div id="navbar-luggage-icon">
                <Link to="/" reloadDocument onClick={() => localStorage.removeItem('feature')}>
                  <Luggage height="40" width="40" fill='rgb(236, 43, 78)' />
                  <div className="fs-5 fw-bold" id="navbar-title">BookVoyage</div>
                </Link>
              </div>

            </div>
            {/*search bar*/}
            <SearchBar />
            {/*add place link*/}
            {user
              ?
              <Link to={'/account/places/new'} className="link-underline link-underline-opacity-0 text-dark fw-medium" id="navbar-add-place">
                Add your place
              </Link>
              :
              null}

            {/*user*/}
            <Link to={user ? '/account' : '/login'} className="shadow-sm d-flex gap-2 rounded-pill align-items-center p-2 border border-2 text-decoration-none" id="navbar-user-icon">
              <div className="p-1">
                <List width="15" height="15" fill="black" />
              </div>

              {user?.profilePhoto
                ?
                <div className="custom-color-profile-logged rounded-pill border-0 p-1">
                  <img className='p-0 rounded-circle img-profile-photo shadow-sm' src={'http://localhost:4000/uploads/' + user.profilePhoto} alt='' />
                </div>
                :
                <div className="custom-color-profile rounded-pill border-0 p-1">
                  <PersonCircle width="30" height="30" fill="white" />
                </div>
              }
            </Link>
          </div>
        </div>
      </nav>
    </header>


  );
};

export default Header;
