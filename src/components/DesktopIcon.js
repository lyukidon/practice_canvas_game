import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import computerIcon from '../assets/image/computer.png';

const IconContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    flex-grow: 0;
`;

export default ({ icon, title }) => {
    const iconRef = useRef(null);
    const [toggle, setToggle] = useState(false);

    const navigate = useNavigate();

    const handleDBClick = useCallback(()=>navigate('/bomberman',{replace:true}),[navigate])

    const onToggle = () => {
        setToggle(!toggle);
    }

    useEffect(()=>{
        const icon = iconRef.current;
        console.log(iconRef.current)
        icon.addEventListener('dbclick', ()=>{
            console.log('hi')
            handleDBClick()})
    })

    return (
        <IconContainer ref={iconRef} onClick={onToggle} onDoubleClick={handleDBClick}>
            <img src={computerIcon} width={40} height={40} />
            <span style={toggle ? { backgroundColor: "gray" }:{backgroundColor:"rgba(0,0,0,0)"}}>{title}</span>
        </IconContainer>
    );
};
