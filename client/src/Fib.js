import axios from 'axios';
import { useState, useEffect } from 'react';

const Fib = () => {
  const [state, setState] = useState({
    seenIndexes: [],
    values: {},
    index: '',
  });

  useEffect(() => {
    fetchIndexes();
    fetchValues();
  }, []);

  const fetchValues = async () => {
    try {
      const values = await axios.get('/api/values/current');
      console.log(values)
      setState({ values: values.data });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchIndexes = async () => {
    try {
      const seenIndexes = await axios.get('/api/values/all');
      setState({
        seenIndexes: seenIndexes.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios
      .post('/api/values', {
        index: state.index,
      })
      .catch((err) => {
        console.log(err);
      });
    setState({ index: '' });
  };

  const renderSeenIndexes = () => {
    if (state.seenIndexes && state.seenIndexes.length > 0) {
      return state.seenIndexes.map(({ number }) => number).join(', ');
    } else {
      return "No indexes seen yet.";
    }
  };
  

  const renderValues = () => {
    const entries = [];

    for (let key in state.values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {state.values[key]}
        </div>
      );
    }
    return entries;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input
          value={state?.index}
          onChange={(event) => setState({ index: event.target.value })}
        />
        <button>Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      {renderSeenIndexes()}

      <h3>Calculated Values:</h3>
      {renderValues()}
    </div>
  );
};

export default Fib;
