const Persons = (props) => {
  return (
    <div>
      <ul>
        {props.persons
          .map((person) => person)
          .filter(
            (val) => val.name.toLowerCase().indexOf(props.filterName) > -1
          )
          .map((person) => (
            <li key={`${person.name}-${person.id}`}>
              {person.name} {person.number}{' '}
              <button
                className="del"
                id={person.id}
                onClick={props.deleteContact}
              >
                delete
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Persons;
