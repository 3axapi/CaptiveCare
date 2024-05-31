const Default = (props) => {

  const { caption, name, data, setData } = props;

  return <div>
    <label>
      {caption}:
      <input
        type="text"
        value={data?.[name]}
        onChange={(e) => setData(prev => {
          prev ??= {};
          prev[name] = e.target.value;
          return { ...prev }
        })}
      />
    </label>
  </div>
}

export default Default