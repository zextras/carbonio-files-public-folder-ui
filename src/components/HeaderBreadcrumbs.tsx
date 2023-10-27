import React from "react";
import {Breadcrumbs, BreadcrumbsProps} from "@zextras/carbonio-design-system";

interface HeaderBreadcrumbsProps {
    crumbs: BreadcrumbsProps['crumbs']
}

export const HeaderBreadcrumbs: React.FC<HeaderBreadcrumbsProps> = ({crumbs}) => {
    return <Breadcrumbs crumbs={crumbs} />;
};
