import './App.css';
import {useState, useEffect} from "react"
import data from './data.json'
import createStore from './redux/createStore';
function App() {
  const [members, setMembers] = useState([])
  const [loading, setLoadding] = useState(true);

  // create the family tree list 
  const initFT = () => {
    setMembers(data)
    setLoadding(false)
  }

  useEffect(() => {
    initFT();
  }, [loading])
  
  const cardDisplay = () => {
    const fullname = d => `${d.data['firstName'] || ''} ${d.data['lastName'] || ''}`
    fullname.create_form = "{firstName} {lastName}"
    return [fullname]
  }

  useEffect(() => {
    if (loading || !members) return;
    
    const card_dim = {w:220,h:70,text_x:75,text_y:15};
    const card_display = cardDisplay();
    const store = createStore({
      data: members,
      node_separation: 250, 
      level_separation: 150,
    })
  })
  return (
    <div className="App">
        
    </div>
  );
}

export default App;