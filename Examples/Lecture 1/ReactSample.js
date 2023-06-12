import React, { useState } from 'react';

function FirstApp() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  const handleClick = () => {
    setCount(count+1);
  };
  
  const handleInputChange = (event) => {
    setName(event.target.value);
  };
  const styles = {
    backgroundColor: count % 2 === 0 ? 'lightblue' : 'lightgreen',
    padding: '10px'
  };

  return (
  <div style={styles}>
    <h1>Hello My name is {name}</h1>
    <h2>Welcome to EE P 523</h2>
    <li>Item #1</li>
    <li>Item #2</li>
    <li>Item #3</li>
    <p>You have clicked the button {count} times.</p>
    <input type="text" value={name} onChange={handleInputChange} />
    <button onClick={handleClick}>Click ME!</button>
    </div>
);
}

export default FirstApp;
