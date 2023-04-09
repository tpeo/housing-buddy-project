const { default: jwtDecode } = require("jwt-decode");

const verifyCredentials = async (navigate) => {
    if(localStorage.getItem("@userToken")){
        // const request = await fetch(`https://${process.env.REACT_APP_HOSTNAME}/auth`, {
        //     headers: {
        //         authorization: "Bearer " + localStorage.getItem("@userToken"),
        //     },
        // });
        // const status = await request.status;
        // if (status !== 200) {
        //     navigate("/login");
        //     return -1;
        // }
        const decode = jwtDecode(localStorage.getItem("@userToken"));
        const user = await fetch(`https://${process.env.REACT_APP_HOSTNAME}/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: "Bearer " + localStorage.getItem("@userToken"),
            },
            body: JSON.stringify({ user: decode }),
        });
        const result = (await user.json());
        console.log(result)
        window.localStorage.setItem("@apartment", result.apartment);
        return result.newUser;
    }else{
        navigate("/login");
        return -1;
    }
}

export {verifyCredentials}