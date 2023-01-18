import { useState, useEffect } from 'react';
import axios from 'axios';
import Countries from './components/countries';
import IndividualCountry from './components/individualCountry';
import Filter from './components/filter';

const App = () => {
  const [countriesData, setCountriesData] = useState([]);
  const [filterCountry, setFilterCountry] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((res) => {
      setCountriesData(res.data);
    });
  }, []);

  const handleInputFilter = (e) => {
    setFilterCountry(e.target.value);
  };

  // console.log(countriesData);

  const handleShow = (e) => {
    const clickedCountry = e.nativeEvent.path[1].children[0].innerText;
    setFilterCountry(clickedCountry.toLowerCase());
  };

  const filteredLength = countriesData.filter(
    (val) => val.name.common.toLowerCase().indexOf(filterCountry) > -1
  ).length;

  return (
    <div>
      <Filter value={filterCountry} onChange={handleInputFilter} />

      {filteredLength > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filteredLength === 1 ? (
        <IndividualCountry
          countriesData={countriesData}
          filterCountry={filterCountry}
        />
      ) : (
        <Countries
          countriesData={countriesData}
          filterCountry={filterCountry}
          handleShow={handleShow}
        />
      )}
    </div>
  );
};
export default App;
