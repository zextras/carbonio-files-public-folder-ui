import './App.css'
import {ListItem} from "./components/ListItem.tsx";
import {listItemPropsBuilder} from "./components/ListItem.test.tsx";
import {HeaderBreadcrumbs} from "./components/HeaderBreadcrumbs.tsx";
import {crumbsBuilder} from "./components/HeaderBreadcrumbs.test.tsx";

function App() {

  return (
    <>
      <div>
          <HeaderBreadcrumbs crumbs={crumbsBuilder(5)} />
          <ListItem {...listItemPropsBuilder()} />
      </div>
    </>
  )
}

export default App
