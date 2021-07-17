import React, { ReactElement } from 'react'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/reducer/root'

interface Props {
    
}

export const  LayoutSwitch:FC<Props>=({children}): ReactElement =>{
    const user = useSelector((state:RootState) => state.user)
    console.log(user)
    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}
