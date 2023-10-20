import React from "react";


export const CustomPagination = ({children, pageView = 0}) => {

    return (
        <>
            {children.map((value, index) => index === pageView && <React.Fragment key={index}>{value}</React.Fragment>
                // router.query.section ? index === Number(router.query.section) && <>{value}</> : index === pageView && <>{value}</>
            )}
        </>
    )
}