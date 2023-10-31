import React from "react";

import { Padding, Text } from "@zextras/carbonio-design-system";
import styled from "styled-components";

const Span2 = styled.span`
  grid-column: 1 / span 2;
  line-height: 1.5;
`;

interface ListHeaderProps {}
export const ListHeader: React.FC<ListHeaderProps> = () => (
	<>
    <Span2>
			<Padding left={"1.5rem"} top={"0.5rem"} bottom={"0.5rem"}>
	<Text weight={'bold'}>Name</Text>
      </Padding>
		</Span2>
	<Text weight={'bold'}>Last modified</Text>
	<Text weight={'bold'}>Extension</Text>
	<Padding right={'1.5rem'}>
			<Text weight={'bold'}>Size</Text>
    </Padding>
  </>
);
