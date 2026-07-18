import React, { createContext, useState } from 'react';

export const MouseContext = createContext({
  cursorType: '',
  cursorChangeHandler: (cursorType: string) => {},
});

const MouseContextProvider = (props: { children: React.ReactNode }) => {
  const [cursorType, setCursorType] = useState('');

  const cursorChangeHandler = (cursorType: string) => {
    setCursorType(cursorType);
  };

  return (
    <MouseContext.Provider
      value={{
        cursorType: cursorType,
        cursorChangeHandler: (cursorType: string) =>
          cursorChangeHandler(cursorType),
      }}
    >
      {props.children}
    </MouseContext.Provider>
  );
};

export default MouseContextProvider;
