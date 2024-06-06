const Filter = ({ dataSearch, handleSearch }) => {
  return (
    <p>
      filter shown with: <input value={dataSearch} onChange={handleSearch} />
    </p>
  );
};

export default Filter;
