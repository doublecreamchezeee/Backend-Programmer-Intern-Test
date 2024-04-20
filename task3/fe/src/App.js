import './App.css';
import { useState, useEffect } from "react";
import data from './data.json';
import createStore from './redux/createStore';
import TreeDisplay from './utils/TreeDisplay';
import Card from './components/Card';

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

  return (
    <div className="ftms" id="FamilyTree">
      <div className="tree-cont">
      </div>
    </div>
  );
}

export default App;
