import './App.css';
import { useState, useEffect } from "react";
import data from './data.json';
import createStore from './redux/createStore';
import TreeDisplay from './utils/TreeDisplay';
import Card from './components/Card';
import ExportButton from './components/ExportButton';
import ImportButton from './components/ImportButton';
const fs = require('fs');

function App() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading || !members) {
      const cont = document.querySelector("#FamilyTree");
      const card_dim = { w: 220, h: 70, text_x: 75, text_y: 15, img_w:60, img_h:60, img_x:5, img_y:5 };
      const card_display = cardDisplay();
      const store = createStore({
        data: members,
        node_separation: 250,
        level_separation: 150,
      });
      const view = TreeDisplay({
        store,
        cont: cont,
      });

      const UserCard = Card({
        store,
        svg: view.svg,
        card_dim: card_dim,
        card_display: card_display,
      });
      view.setCard(UserCard);
      store.setOnUpdate((props) => view.update(props || {}));
      store.update.tree({ initial: true });
    }
  }, [loading, members]);

  const cardDisplay = () => {
    return [
      (d) => `${d.data["firstName"] || ""} ${d.data["lastName"] || ""}`,
    ];
  };

  useEffect(() => {
    setMembers(data);
    setLoading(false);
    console.log(data);
  }, []);

  const handleUpload = (contents) => {
    // Handle the uploaded JSON contents
    try {
      const data = JSON.parse(contents);
      if (Object.keys(data).length === 0) {
        console.log("The JSON file is empty.");
      } else {
        console.log("Uploaded JSON contents:", data);
        // Write the contents to data.json
        fs.writeFile('data.json', JSON.stringify(data), (err) => {
          if (err) {
            console.error("Error writing to data.json:", err);
          } else {
            console.log("Data has been written to data.json");
          }
        });
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  };

  return (
    <div className='container'>
      <div className='nav'>
      <ExportButton/>
      <ImportButton  onUpload={handleUpload}/>
      </div>
      <div className="ftms" id="FamilyTree">
        <div className="tree-cont">
        </div>
      </div>
    </div>

  );
}

export default App;
