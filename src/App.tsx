import {ListItem} from "./components/ListItem.tsx";
import {HeaderBreadcrumbs} from "./components/HeaderBreadcrumbs.tsx";
import {crumbsBuilder, listItemPropsBuilder} from "./utils/utils.ts";
import {Divider, ThemeProvider} from "@zextras/carbonio-design-system";
import {ListHeader} from "./components/ListHeader.tsx";
import styled from "styled-components";

const Grid = styled.div`
  box-sizing: border-box;
  width: 100%;
  gap: 0.5rem 1rem;
  display: grid;
  grid-template-columns: max-content 3fr repeat(3, minmax(max-content, 1fr));
  justify-items: start;
  align-items: center;
  grid-template-rows: minmax(max-content, 1fr);
`;

const RowBorder = styled(Divider)`
  grid-column: 1 / span 5; /* this code makes the row stretch to entire width of the container */
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

    const rowsWithDividers = rows.map((value) => <><ListItem {...value}/><RowBorder
        color={'secondary.disabled'}/></>)


    return (
        <ThemeProvider>
            <HeaderBreadcrumbs crumbs={crumbsBuilder(10)}/>
            <Grid>
                <RowBorder color={'secondary.disabled'}/>
                <ListHeader/>
                <RowBorder color={'secondary.disabled'}/>
                {rowsWithDividers}
            </Grid>


        </ThemeProvider>
    )
}

export default App
