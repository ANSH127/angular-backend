

const loginUser= async (req, res) => {
    console.log("login user");
    res.send("login user");
}

const signupUser = async (req, res) => {
    console.log("signup user");
    res.send("signup user");
}

module.exports = {
    loginUser,
    signupUser
}