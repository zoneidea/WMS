import { React, useState, createContext } from 'react'

export const permissionContext = createContext()

export default function permissionContextProvider(props) {
    return (
        <permissionContext.Provider>
            {props.children}
        </permissionContext.Provider>
    )
}
