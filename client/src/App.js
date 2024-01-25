import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import axios from "axios";

import "./App.css";

import { UserContextProvider } from "./userContext";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Account from "./pages/Account/Account";
import Places from "./components/Places/Places";
import PlacesFormPage from "./components/PlacesFormPage/PlacesFormPage";
import PlacePage from "./pages/PlacePage/PlacePage";
import Bookings from "./pages/Bookings/Bookings";
import BookingPage from "./pages/BookingPage/BookingPage";
import Auth from "./components/Auth/Auth";
import NotFound from "./components/NotFound/NotFound";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;
const features = ['wifi', 'tv', 'free-parking', 'kitchen', 'near-beach', 'bbq', 'near-airport', 'washing-machine', 'adapted', 'swimming-pool', 'heating', 'gaming-hall', 'bar', 'near-city-center', 'conference-room', 'fitness', 'terrace', 'self-check-in',
  'restaurant', 'coffee-maker', 'ac', 'breakfast', 'hair-dryer', 'smoking-allowed', 'spa-center'];

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home features={features} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<Auth><Account /></Auth>} />
            <Route path="/account/places" element={<Auth><Places /></Auth>} />
            <Route path="/account/places/new" element={<Auth><PlacesFormPage features={features} /></Auth>} />
            <Route path="/account/places/:id" element={<Auth><PlacesFormPage features={features} /></Auth>} />
            <Route path="/place/:id" element={<PlacePage />} />
            <Route path="/account/bookings" element={<Auth><Bookings /></Auth>} />
            <Route path="/account/bookings/:id" element={<Auth><BookingPage /></Auth>} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </UserContextProvider>


  );
}

export default App;
