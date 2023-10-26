import './App.css'
import {ListItem} from "./components/ListItem.tsx";
import {NodeType} from "./types/graphql/types.ts";

function App() {



  return (
    <>
      <div>
          <ListItem name={'ciao'} type={NodeType.Text} />
      </div>
    </>
  )
}

export default App
