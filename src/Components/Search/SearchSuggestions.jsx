import styles from "./Search.module.css";

const SearchSuggestions = ({city,onClick}) => {
    return(
        <div className={styles.suggestionDropdown} onClick={onClick}>
           <p>{city}</p>
        </div>
    )
}

export default  SearchSuggestions;