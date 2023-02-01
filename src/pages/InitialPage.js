import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import DesktopIcon from "../components/DesktopIcon";

const Background = styled.div`
    width: 100%;
    height: ${window.innerHeight}px;
    background-color: #007c7c;
    position: fixed;
    top: 0px;
    left: 0px;
`;
const Grid = styled.div`
    display: grid;
    grid-template-rows: repeat(8, 80px) 45px;
    grid-template-columns: repeat(8, 1fr);
    gap: 20px;
`;

const IconArray = [
    {
        icon: "",
        title: "Home",
    },
    {
        icon: "",
        title: "Bomber Man",
    },
];

function InitialPage() {
    return (
        <div>
            <Helmet>
                <title>Main</title>
            </Helmet>

            <Background className="background" height={window.innerHeight}>
                <Grid className="grid">
                    {IconArray.map((c) => (
                        <DesktopIcon icon={c.icon} title={c.title} />
                    ))}
                </Grid>
            </Background>
        </div>
    );
}

export default InitialPage;
