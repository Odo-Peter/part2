const Filter = ({ value, onChange }) => {
  return (
    <div>
      <form>
        <div>
          Find countries <input value={value} onChange={onChange} />
        </div>
      </form>
    </div>
  );
};

export default Filter;
