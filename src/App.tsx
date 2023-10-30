import {ListItem} from "./components/ListItem.tsx";
import {HeaderBreadcrumbs} from "./components/HeaderBreadcrumbs.tsx";
import {crumbsBuilder, listItemPropsBuilder} from "./utils/utils.ts";
import {Divider, ThemeProvider} from "@zextras/carbonio-design-system";
import {ListHeader} from "./components/ListHeader.tsx";
import styled from "styled-components";

const Grid = styled.div`
  width: 100%;
  gap: 0.25rem 1rem;
  padding: 0 1.5rem; 
  display: grid;
  grid-template-columns: fit-content() auto repeat(3, 1fr);
  justify-items: start;
`;

const RowBorder = styled(Divider)`
    grid-column: 1 / 5; /* this code makes the row stretch to entire width of the container */
`;



const rows = [
    listItemPropsBuilder(),
    listItemPropsBuilder(),
    listItemPropsBuilder(),
    listItemPropsBuilder(),
    listItemPropsBuilder(),
    listItemPropsBuilder(),
    listItemPropsBuilder()
]

function App() {

  const rowsWithDividers = rows.map((value) => <><ListItem {...value}/><RowBorder color={'secondary.disabled'} /></>)


  return (
      <ThemeProvider>
          <div style={{width: '800px'}}>
              <HeaderBreadcrumbs crumbs={crumbsBuilder(10)} />
          </div>
          <ListHeader />
          <Grid>
              {rowsWithDividers}
          </Grid>


      </ThemeProvider>
  )
}

export default App
