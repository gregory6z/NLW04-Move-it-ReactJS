import { useState } from 'react';

interface ButtonProps {
  children: string;
  color: string;
}

export function Button(props: ButtonProps) {
  const [counter, setCounter] = useState(1);

  function increment() {
    setCounter(counter + 1);
  }

  return (
    <button
      type="button"
      style={{ backgroundColor: props.color }}
      onClick={increment}
    >
      {props.children}
    </button>
  );
}
