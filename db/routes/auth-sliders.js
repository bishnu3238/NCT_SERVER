try {
    const router = require('express').Router();
    const sliders = require('../models/slider-model');
    const { header, validationResult } = require('express-validator');
    const jwt = require('jsonwebtoken');
    const verifyUser = require("../middlewares/verify-jwt-token");
    const encrypter = require("../../lib/encryption/encrypter")
    const decrypter = require("../../lib/decryption/decrypter")
    const bodyParser = require('body-parser');
    const dotenv = require('dotenv');

    dotenv.config()

    router.post("/edit", [
        header("title", "Please provide valid name...").isLength({ min: 3 }),
        header("caption", "Please provide valid email...").isLength({ min: 3 }),
        header("slogan", "Please provide valid password...").isLength({ min: 3 }),
        header("text", "Please provide valid password...").isLength({ min: 3 }),
        header("url", "Please provide valid password...").isLength({ min: 3 }),
        header("sliderId", "Please provide valid password...").isLength({ min: 3 }),
    ], async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(411).json({
                id: 2,
                statusCode: 411,
                message: "Please provide valid slider data...",
                errors: errors.array(),
            });
        } else if (errors.isEmpty()) {
            try {
                if (req.header('serverPass') !== process.env.SERVER_PASSWORD) {
                    const id = req.header('sliderId');
                    let registeredUserEmail = await sliders.findOne({
                        _id: req.header('sliderId')
                    })

                    if (!registeredUserEmail) {
                        return res.status(409).json({
                            id: 16,
                            statusCode: 409,
                            message: "No such slider found...",
                        });
                    } else {
                        if(req.body.image) {
                            const sliderUpdates = {
                                _title: req.header('title'),
                                _caption: req.header('caption'),
                                _slogan: req.header('slogan'),
                                _redirectText: req.header('text'),
                                _redirectUrl: req.header('url'),
                                _imageBase64: req.body.image,
                            }
                            const slider = await sliders.findByIdAndUpdate(id, sliderUpdates)
                        } else {
                            const sliderUpdates = {
                                _title: req.header('title'),
                                _caption: req.header('caption'),
                                _slogan: req.header('slogan'),
                                _redirectText: req.header('text'),
                                _redirectUrl: req.header('url'),
                            }
                            const slider = await sliders.findByIdAndUpdate(id, sliderUpdates)
                        }
                        const updatedSlider = await sliders.findById(id)

                        if(updatedSlider) {
                            return res.status(201).json({
                                id: 13,
                                statusCode: 201,
                                message: "Slider updated succesfully...",
                                slider: updatedSlider
                            }); 
                        } else {
                            return res.status(201).json({
                                id: 13,
                                statusCode: 201,
                                message: "Slider updatation failed...",
                            }); 
                        }
                    }
                } else {
                    return res.status(400).json({
                        id: 20,
                        statusCode: 400,
                        message: "Access denied...",
                    });
                }
            } catch (error) {
                console.log("Some error occured in the auth-admins register route: ", error)
                return res.status(500).json({
                    id: 20,
                    statusCode: 500,
                    message: "Internal server error...",
                });
            }
        }
    })

    router.post("/create", [
        header("title", "Please provide valid name...").isLength({ min: 3 }),
        header("caption", "Please provide valid email...").isLength({ min: 3 }),
        header("slogan", "Please provide valid password...").isLength({ min: 3 }),
        header("text", "Please provide valid password...").isLength({ min: 3 }),
        header("url", "Please provide valid password...").isLength({ min: 3 }),
    ], async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(411).json({
                id: 2,
                statusCode: 411,
                message: "Please provide valid slider data...",
                errors: errors.array(),
            });
        } else if (errors.isEmpty()) {
            try {
                if (req.header('serverPass') !== process.env.SERVER_PASSWORD) {
                    const id = req.header('sliderId');
                    let registeredUserEmail = await sliders.findOne({
                        _id: req.header('sliderId')
                    })

                    if (registeredUserEmail) {
                        return res.status(409).json({
                            id: 16,
                            statusCode: 409,
                            message: "Slider already exists...",
                        });
                    } else {
                        let newSlider = await sliders.create({
                            _title: req.header('title'),
                            _caption: req.header('caption'),
                            _slogan: req.header('slogan'),
                            _redirectText: req.header('text'),
                            _redirectUrl: req.header('url'),
                            _imageBase64: req.body.image,
                        })

                        if(newSlider) {
                            return res.status(201).json({
                                id: 13,
                                statusCode: 201,
                                message: "Slider created succesfully...",
                                slider: newSlider
                            });
                        } else {
                            return res.status(400).json({
                                id: 20,
                                statusCode: 400,
                                message: "Slider creation failed...",
                            });
                        }

                    }
                } else {
                    return res.status(400).json({
                        id: 20,
                        statusCode: 400,
                        message: "Access denied...",
                    });
                }
            } catch (error) {
                console.log("Some error occured in the auth-admins register route: ", error)
                return res.status(500).json({
                    id: 20,
                    statusCode: 500,
                    message: "Internal server error...",
                });
            }
        }
    })

    router.get("/fetch", [
        header("email", "Please provide valid email...").isEmail(),
        header("password", "Please provide valid password...").isLength({ min: 8 })
    ], async (req, res) => {
        const errors = validationResult(req)

        if (errors.isEmpty()) {
            return res.status(411).json({
                id: 2,
                statusCode: 411,
                message: "Please provide valid credentials...",
                errors: errors.array(),
            });
        } else if (!errors.isEmpty()) {
            try {
                if (req.header('serverPass') !== process.env.SERVER_PASSWORD) {
                    let slider = await sliders.find()


                    if (slider) {
                            return res.status(201).json({
                                id: 13,
                                statusCode: 201,
                                message: "Sliders data fetched succesfully...",
                                sliders: slider
                            });
                    } else {
                        return res.status(400).json({
                            id: 14,
                            statusCode: 400,
                            message: "Sliders data fetch failed...",
                        });
                    }
                } else {
                    return res.status(400).json({
                        id: 20,
                        statusCode: 400,
                        message: "Access denied...",
                    });
                }
            } catch (error) {
                console.log("Some error occured in the auth-admins login route: ", error)
                return res.status(500).json({
                    id: 20,
                    statusCode: 500,
                    message: "Internal server error...",
                });
            }
        }
    })

    router.get("/get", [
        header("email", "Please provide valid email...").isEmail(),
        header("password", "Please provide valid password...").isLength({ min: 8 }),
        header("sliderId", "Please provide valid password...").isLength({ min: 8 })
    ], async (req, res) => {
        const errors = validationResult(req)

        if (errors.isEmpty()) {
            return res.status(411).json({
                id: 2,
                statusCode: 411,
                message: "Please provide valid credentials...",
                errors: errors.array(),
            });
        } else if (!errors.isEmpty()) {
            try {
                if (req.header('serverPass') !== process.env.SERVER_PASSWORD) {
                    const sliderId = req.header('sliderId')
                    let slider = await sliders.findById(sliderId)


                    if (slider) {
                            return res.status(201).json({
                                id: 13,
                                statusCode: 201,
                                message: "Sliders data fetched succesfully...",
                                sliders: slider
                            });
                    } else {
                        return res.status(400).json({
                            id: 14,
                            statusCode: 400,
                            message: "Sliders data fetch failed...",
                        });
                    }
                } else {
                    return res.status(400).json({
                        id: 20,
                        statusCode: 400,
                        message: "Access denied...",
                    });
                }
            } catch (error) {
                console.log("Some error occured in the auth-admins login route: ", error)
                return res.status(500).json({
                    id: 20,
                    statusCode: 500,
                    message: "Internal server error...",
                });
            }
        }
    })

    module.exports = router;
} catch (error) {
    console.log("Some error occured in the auth-admins main branch: ", error)
}