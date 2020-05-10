exports.list = (req, res) => {
    res.send({
        success: true,
        message: 'Its works!'
    })
};

exports.create = (req, res) =>{
    res.send({
        success: true,
        message: 'Received Post!'
    })
};