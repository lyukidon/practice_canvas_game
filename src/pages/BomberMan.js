import React from "react";
import { Helmet } from "react-helmet";

import Page from '../components/page/Page'
import BomberRenderer from '../components/BombRenderer'
import ApplicationWindow from "../components/page/ApplicationWindow";

function BomberMan() {
    return (
        <div>
            <Helmet>
                <title>
                    
                </title>
            </Helmet>
            <Page />
            <ApplicationWindow name={'Bomber Man'} Application={<BomberRenderer />} />
        </div>
    );
};

export default BomberMan;
