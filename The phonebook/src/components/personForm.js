const PersonForm = (props) => {
  return (
    <div>
      <form>
        <div>
          <h3>Add a new</h3>
          name: <input value={props.newName} onChange={props.handleInput} />
        </div>
        <div>
          number:{' '}
          <input value={props.newNumber} onChange={props.handleNumberInput} />
        </div>
        <div>
          <button className="add" onClick={props.addContact} type="submit">
            add
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
