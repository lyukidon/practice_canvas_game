import React, {useState} from "react";
import styled from "styled-components";
import { useInterval } from "react-use";
import { Time } from "@kidon/time-js";

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
const TimeTab = styled.button`
    height: 90%;
    background-color: #C3BFBE;
    > div {
        font-size: small
    }
`



export default ()=>{
    const [time, setTime] = useState(0)

    return (
        <MenuBar>
            <Menu>Start</Menu>
            <TimeTab>
              <div>{Time("hh:mm", false)}</div>               
            </TimeTab>
        </MenuBar>
    )
}