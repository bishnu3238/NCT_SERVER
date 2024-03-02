try {
    const router = require('express').Router();

    router.post("/", async (req, res) => {
        const fb__leadData = req.header('fb__leadData');
        console.log({fb__leadData})

        return res.status(200).json({
            id: 2,
            statusCode: 400,
            message: "Message Recorded"
        })
    })

    module.exports = router
} catch (error) {
    console.log("Some error occured in the auth-users main branch: ", error)
}