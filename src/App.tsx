import './App.css'
import {ListItem} from "./components/ListItem.tsx";
import {HeaderBreadcrumbs} from "./components/HeaderBreadcrumbs.tsx";
import {crumbsBuilder, listItemPropsBuilder} from "./utils/utils.ts";
import {ThemeProvider} from "@zextras/carbonio-design-system";
import {List} from "./components/List.tsx";

function App() {

  return (
    <>
      <ThemeProvider>
          <div style={{width: '800px'}}><HeaderBreadcrumbs crumbs={crumbsBuilder(10)} /></div>
          <List listItems={[
              <ListItem {...listItemPropsBuilder()} />,
              <ListItem {...listItemPropsBuilder()} />,
              <ListItem {...listItemPropsBuilder()} />,
              <ListItem {...listItemPropsBuilder()} />,
              <ListItem {...listItemPropsBuilder()} />,
              <ListItem {...listItemPropsBuilder()} />,
              <ListItem {...listItemPropsBuilder()} />
            ]}
          />

      </ThemeProvider>
    </>
  )
}

export default App
