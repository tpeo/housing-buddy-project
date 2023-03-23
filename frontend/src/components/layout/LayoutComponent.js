import React from "react";
import NavBarComponent from "./NavBarComponent";
import Footer from "./Footer"
import './Layout.css'

export default function LayoutComponent(props) {

    return (
        <div id="page">
            <NavBarComponent></NavBarComponent>
                <div id="children" min-height='100vh'>
                    {props.children}
                </div>
            <Footer></Footer>
        </div>

    );
}
