import React, { ReactElement } from 'react'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/reducer/root'
import LayoutDefault from '../Layouts/LayoutDefault'

interface Props {
    layoutProps:any
}

export const  LayoutSwitch:FC<Props>=({children,layoutProps}): ReactElement =>{
    const user = useSelector((state:RootState) => state.user)
     const Layout = user?LayoutDefault:LayoutDefault 

    return (
        <Layout {...layoutProps}>
            {children} 
        </Layout>
    )
}
