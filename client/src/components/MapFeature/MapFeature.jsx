
import { ReactComponent as WiFi } from '../../assets/wifi.svg'
import { ReactComponent as FreeParking } from '../../assets/free-parking.svg'
import { ReactComponent as TV } from '../../assets/tv.svg'
import { ReactComponent as AC } from '../../assets/ac.svg'
import { ReactComponent as Heating } from '../../assets/heating.svg'
import { ReactComponent as SelfCheckIn } from '../../assets/self-check-in.svg'
import { ReactComponent as CoffeeMaker } from '../../assets/coffee-maker.svg'
import { ReactComponent as NearBeach } from '../../assets/near-beach.svg'
import { ReactComponent as NearAirport } from '../../assets/near-airport.svg'
import { ReactComponent as SwimmingPool } from '../../assets/swimming-pool.svg'
import { ReactComponent as Kitchen } from '../../assets/kitchen.svg'
import { ReactComponent as Terrace } from '../../assets/terrace.svg'
import { ReactComponent as Fitness } from '../../assets/fitness.svg'
import { ReactComponent as Breakfast } from '../../assets/breakfast.svg'
import { ReactComponent as BBQ } from '../../assets/bbq.svg'
import { ReactComponent as CityCenter } from '../../assets/city-center.svg'
import { ReactComponent as GamingHall } from '../../assets/gaming-hall.svg'
import { ReactComponent as ConferenceRoom } from '../../assets/conference-room.svg'
import { ReactComponent as Restaurant } from '../../assets/restaurant.svg'
import { ReactComponent as Bar } from '../../assets/bar.svg'
import { ReactComponent as Adapted } from '../../assets/adapted.svg'
import { ReactComponent as WashingMachine } from '../../assets/washing-machine.svg'
import { ReactComponent as HairDryer } from '../../assets/hair-dryer.svg'
import { ReactComponent as SmokingAllowed } from '../../assets/smoking-allowed.svg'
import { ReactComponent as SPACenter } from '../../assets/spa-center.svg'


const MapFeature = ({ feature, width = 16, height = 16, classNameSVG = '', classNameWrapperDiv = '', fill = 'currentColor' }) => {
    let map = {
        'wifi': <div className={classNameWrapperDiv}><WiFi height={height} width={width} className={classNameSVG} fill={fill} />Wi-Fi</div>,
        'free-parking': <div className={classNameWrapperDiv}><FreeParking height={height} width={width} className={classNameSVG} fill={fill} />Free Parking</div>,
        'tv': <div className={classNameWrapperDiv}><TV height={height} width={width} className={classNameSVG} fill={fill} />TV</div>,
        'ac': <div className={classNameWrapperDiv}><AC height={height} width={width} className={classNameSVG} fill={fill} />AC</div>,
        'heating': <div className={classNameWrapperDiv}><Heating height={height} width={width} className={classNameSVG} fill={fill} />Heating</div>,
        'self-check-in': <div className={classNameWrapperDiv}><SelfCheckIn height={height} width={width} className={classNameSVG} fill={fill} />Self check-in</div>,
        'coffee-maker': <div className={classNameWrapperDiv}><CoffeeMaker height={height} width={width} className={classNameSVG} fill={fill} />Coffee maker</div>,
        'near-beach': <div className={classNameWrapperDiv}><NearBeach height={height} width={width} className={classNameSVG} fill={fill} />Near beach</div>,
        'near-airport': <div className={classNameWrapperDiv}><NearAirport height={height} width={width} className={classNameSVG} fill={fill} />Near airport</div>,
        'swimming-pool': <div className={classNameWrapperDiv}><SwimmingPool height={height} width={width} className={classNameSVG} fill={fill} />Swimming pool</div>,
        'kitchen': <div className={classNameWrapperDiv}> <Kitchen height={height} width={width} className={classNameSVG} fill={fill} />Kitchen</div>,
        'washing-machine': <div className={classNameWrapperDiv}><WashingMachine height={height} width={width} className={classNameSVG} fill={fill} />Washing machine</div>,
        'terrace': <div className={classNameWrapperDiv}><Terrace height={height} width={width} className={classNameSVG} fill={fill} />Terrace</div>,
        'fitness': <div className={classNameWrapperDiv}><Fitness height={height} width={width} className={classNameSVG} fill={fill} />Fitness</div>,
        'bbq': <div className={classNameWrapperDiv}><BBQ height={height} width={width} className={classNameSVG} fill={fill} />BBQ</div>,
        'near-city-center': <div className={classNameWrapperDiv}><CityCenter height={height} width={width} className={classNameSVG} fill={fill} />Near city center</div>,
        'gaming-hall': <div className={classNameWrapperDiv}><GamingHall height={height} width={width} className={classNameSVG} fill={fill} />Gaming hall</div>,
        'conference-room': <div className={classNameWrapperDiv}> <ConferenceRoom height={height} width={width} className={classNameSVG} fill={fill} />Conference Room</div>,
        'restaurant': <div className={classNameWrapperDiv}><Restaurant height={height} width={width} className={classNameSVG} fill={fill} />Restaurant</div>,
        'bar': <div className={classNameWrapperDiv}><Bar height={height} width={width} className={classNameSVG} fill={fill} />Bar</div>,
        'adapted': <div className={classNameWrapperDiv}><Adapted height={height} width={width} className={classNameSVG} fill={fill} />Adapted</div>,
        'breakfast': <div className={classNameWrapperDiv}><Breakfast height={height} width={width} className={classNameSVG} fill={fill} />Breakfast</div>,
        'hair-dryer': <div className={classNameWrapperDiv}><HairDryer height={height} width={width} className={classNameSVG} fill={fill} />Hair dryer</div>,
        'smoking-allowed': <div className={classNameWrapperDiv}><SmokingAllowed height={height} width={width} className={classNameSVG} fill={fill} />Smoking allowed</div>,
        'spa-center': <div className={classNameWrapperDiv}><SPACenter height={height} width={width} className={classNameSVG} fill={fill} />SPA center</div>,

    }
    return (
        <div >
            {map[feature]}
        </div>
    )
}
export default MapFeature;