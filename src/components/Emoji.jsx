function Emoji({ emoji = "" }) {
  if (emoji === undefined) return null;
  var countryCode = Array.from(emoji, codeUnit => codeUnit.codePointAt())
    .map(char => String.fromCharCode(char - 127397).toLowerCase())
    .join("");
  return (
    <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
  );
}

export default Emoji;
