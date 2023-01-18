const Filter = (props) => {
  return (
    <div>
      filter shown with{' '}
      <input value={props.filterName} onChange={props.handleFilter} />
    </div>
  );
};

export default Filter;

// <div> filter shown with <input value={filterName} onChange={handleFilter} /> </div>
