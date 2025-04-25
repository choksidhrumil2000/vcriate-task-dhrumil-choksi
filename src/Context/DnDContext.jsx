import { createContext, useContext, useState } from "react";

const DnDContext = createContext([null, (_) => {}]);

export const DnDProvider = ({ children }) => {
  const [type, setType] = useState(null);
  const [currentNodeData, setCurrentNodeData] = useState({});

  return (
    <DnDContext.Provider
      value={[type, setType, currentNodeData, setCurrentNodeData]}
    >
      {children}
    </DnDContext.Provider>
  );
};

export default DnDContext;

export const useDnD = () => {
  return useContext(DnDContext);
};
