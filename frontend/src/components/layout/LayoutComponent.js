import React from "react";
import NavBarComponent from "./NavBarComponent";
import Footer from "./Footer"
import './Layout.css'

export default function LayoutComponent(props) {

    return (
        <div id="page">
            <NavBarComponent></NavBarComponent>
                {props.children}
            <Footer></Footer>
        </div>

    );
}
