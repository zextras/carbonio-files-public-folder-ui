import React from "react";
import {Text} from "@zextras/carbonio-design-system";

interface ListHeaderProps {}
export const ListHeader: React.FC<ListHeaderProps> = () => {

    return (
       <>
           <Text>Name</Text>
           <Text>Last modified</Text>
           <Text>Extension</Text>
           <Text>Size</Text>
       </>
    );
};
