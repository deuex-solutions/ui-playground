import "./App.css";
import List from "./components/List/Index";
import { useState } from "react";
import { mockItems } from "./mockData";

function App() {
  const [openFolderRecord, setOpenFolderRecord] = useState<
    Record<string, boolean>
  >({});
  const handleFolderClick = (id: string) => {
    setOpenFolderRecord({ ...openFolderRecord, [id]: !openFolderRecord[id] });
  };

  return (
    <div className="App">
      <List
        items={mockItems}
        openFolderRecord={openFolderRecord}
        handleFolderClick={handleFolderClick}
      />
    </div>
  );
}

export default App;
