const notFound = async (req, res) => {
    res.json({
        status: 404,
        error: true
    })
}

const errorHandl = async (res, message, status) => {
    res.json({
        status,
        error: true,
        message: message.message
    })
}

module.exports = {
    notFound,
    errorHandl
}