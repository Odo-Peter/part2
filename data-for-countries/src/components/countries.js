const Countries = (props) => {
  return (
    <div>
      {props.countriesData
        .map((country) => country)
        .filter(
          (val) =>
            val.name.common.toLowerCase().indexOf(props.filterCountry) > -1
        )
        .map((country) => (
          <div key={country.name.common}>
            <span>{country.name.common}</span>{' '}
            <button onClick={props.handleShow}>show</button>
          </div>
        ))}
    </div>
  );
};

export default Countries;
