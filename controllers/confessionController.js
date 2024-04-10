

// get confwssion


const getAllConfessions = async (req, res) => {
    console.log("get all confessions");
    res.send("get all confessions");
}

// add confession

const addConfession = async (req, res) => {
    console.log("add confession");
    res.send("add confession");
}

// delete confession

const deleteConfession = async (req, res) => {
    console.log("delete confession");
    res.send("delete confession");
}

module.exports = {
    getAllConfessions,
    addConfession,
    deleteConfession
}