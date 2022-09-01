import "./App.css";
import List from "./components/List";
import { useState } from "react";
import { mockItems } from "./mockData";
import ContextMenu from "./components/Menus/ContextMenu";

const excludedClassNames = ["fileLineContent", "folderLineContent"];
function App() {
  const [openFolderRecord, setOpenFolderRecord] = useState<
    Record<string, boolean>
  >({});
  const handleFolderClick = (id: string) => {
    setOpenFolderRecord({ ...openFolderRecord, [id]: !openFolderRecord[id] });
  };

  const contextMenuOptions = [
    { label: "New File", action: () => alert("New file created!") },
    { label: "New Folder", action: () => alert("New folder created!") },
  ];

  return (
    <div className="App">
      <List
        items={mockItems}
        openFolderRecord={openFolderRecord}
        handleFolderClick={handleFolderClick}
      />
      <ContextMenu
        options={contextMenuOptions}
        excludedClassNames={excludedClassNames}
      />
    </div>
  );
}

export default App;
