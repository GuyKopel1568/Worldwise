import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";

const flagEmojiToPNG = flag => {
  var countryCode = Array.from(flag, codeUnit => codeUnit.codePointAt())
    .map(char => String.fromCharCode(char - 127397).toLowerCase())
    .join("");
  return (
    <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
  );
};

function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;
  if (!cities.length) return <Message message="No countries to display" />;

  const countriesArray = cities.reduce((arr, city) => {
    if (!arr.map(el => el.country).includes(city.country))
      return [
        ...arr,
        { country: city.country, emoji: flagEmojiToPNG(city.emoji) }
      ];
    else return arr;
  }, []);

  console.log(countriesArray);

  return (
    <ul className={styles.countryList}>
      {countriesArray.map(country =>
        <CountryItem key={country.country} country={country} />
      )}
    </ul>
  );
}

export default CountryList;
