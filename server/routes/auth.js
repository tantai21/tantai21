const express = require('express');
const router = require("express").Router();
const argon2 = require('argon2');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
//@route POST api/auth/register
// @desc Register User
// @accsess Public
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res
            .status(400)
            .json({ success: false, message: 'Missing username or password' })
    }
    try {
        // Check for existing user

        const user = User.findOne({ username });
        if (user)
            return res
                .status(400)
                .json({ success: false, message: 'User already taken' });
        // All good
        const hashedPassword = await argon2.hash(password);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.json({ name: username })
        //  return token
        const accessToken = jwt
            .sign({ userId: newUser._id },
                process.env.ACCESS_TOKEN_SECRET);
        res.json({ success: true, message: 'User create successfully', accessToken })
    } catch (error) { }
});

module.exports = router