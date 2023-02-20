import ExtLoginComponent from '../ExtLoginComponent';
import { useNavigate } from "react-router-dom";
import {Fragment, useEffect} from "react";

require("dotenv").config();

export default function Login() {
    let navigate = useNavigate();

    useEffect(() => {
        const checkLoggedIn = async () => {
            if(localStorage.getItem("@attendanceToken")){
                const request = await fetch(`https://${process.env.PORT}/auth`, {
                    headers: {
                        authorization: "Bearer " + localStorage.getItem("@attendanceToken"),
                    },
                });
                // Get Status
                const status = await request.status;
                // If token is invalid, push to login
                if (status == 200) {
                    navigate("/");
                }
            }
        }
        checkLoggedIn();
    }, []);

        // <Fragment>
        //     <Layout>
        //             <ExtLoginComponent/>
        //     </Layout>
        // </Fragment>

    return (

        <h1>hello</h1>
    );
}