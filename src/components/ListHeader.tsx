import React from "react";
import {Text} from "@zextras/carbonio-design-system";
import styled from "styled-components";

const Span2Text = styled(Text)`
  grid-column: 1 / span 2;
`

interface ListHeaderProps {}
export const ListHeader: React.FC<ListHeaderProps> = () => {

    return (
       <>
           <Span2Text>Name</Span2Text>
           <Text>Last modified</Text>
           <Text>Extension</Text>
           <Text>Size</Text>
       </>
    );
};
