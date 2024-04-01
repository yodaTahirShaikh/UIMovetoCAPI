const homepage = async (req, res) => {
    return await res.status(200).sendFile("login.html", { root: '../views/' });
};

module.exports = { homepage };