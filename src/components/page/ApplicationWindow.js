import React from "react";
import styled from "styled-components";
import { GrClose } from "react-icons/gr";
import { BiSquare } from "react-icons/bi";

const Window = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    z-index: 1;
    background-color: lightgray;
    border-top: 2px solid lightgray;
    border-left: 2px solid lightgray;
    border-bottom: 2px solid black;
    border-right: 2px solid black;
`;

const TitleBar = styled.div`
    height: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #c3bfbe;
`;

const Title = styled.div`
    flex-grow: 1;
    color: #fff;
    background: linear-gradient(to right, #00009e, lightblue);
`;

const ApplicationBox = styled.div`
    padding: 2px;
`;

const ButtonBox = styled.div`
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: stretch;
`;

const Button = styled.button`
    align-items: center;
    background-color: #cdcdcd;
    border-top: 2px solid #acacac;
    border-left: 2px solid #acacac;
    border-bottom: 2px solid #424242;
    border-right: 2px solid #424242;
    &:active {
        border-top: 2px solid #424242;
        border-left: 2px solid #424242;
        border-bottom: 2px solid #acacac;
        border-right: 2px solid #acacac;
    }
`;

export default ({ name, Application }) => {
    return (
        <Window>
            <TitleBar>
                <Title>{name}</Title>
                <ButtonBox>
                    <Button onClick={() => console.log("click")}>_</Button>
                    <Button>
                        <BiSquare />
                    </Button>
                    <Button>
                        <GrClose />
                    </Button>
                </ButtonBox>
            </TitleBar>
            <ApplicationBox>{Application}</ApplicationBox>
        </Window>
    );
};
