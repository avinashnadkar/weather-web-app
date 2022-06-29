import styles from "./Search.module.css";
import searchIcon from "../../Assets/Icons/loupe.png"
import locationIcon from "../../Assets/Icons/pin.png"

const SearchBar = ({searchField,onChange}) => {
    return(
        <div className={styles.searchContainer} >
           <button className={styles.locationBtn}><img src={locationIcon} alt="Location icon"/></button>
           <input value={searchField} onChange={onChange}/>
           <button className={styles.searchBtn}><img src={searchIcon} alt="search icon"/></button>
        </div>
    )
}

export default SearchBar;