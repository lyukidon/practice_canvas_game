import React, {useState} from "react";
import styled from "styled-components";
import { useInterval } from "react-use";

const MenuBar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #C3BFBE;
    height: 30px;
    align-items: center;
`

const Menu = styled.button`
    height: 90%;
    background-color: #C3BFBE;
`
const Time = styled.button`
    height: 90%;
    background-color: #C3BFBE;
`

export default ()=>{
    const [time, setTime] = useState(0)

    return (
        <MenuBar>
            <Menu>Start</Menu>
            <Time>
                2023-02-03
            </Time>
        </MenuBar>
    )
}