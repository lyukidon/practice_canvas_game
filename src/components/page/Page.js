import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import DesktopIcon from "./DesktopIcon";
import MenuBar from "./MenuBar";

const Background = styled.div`
    width: 100%;
    height: 100%;
    background-color: #007c7c;
    position: fixed;
    top: 0px;
    left: 0px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Grid = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100px;
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

function Page() {
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
                <MenuBar />
            </Background>
        </div>
    );
}

export default Page;