const bcrypt = require('bcryptjs')
const express = require('express')
const router = express.Router()
const Users = require('../users/user-model')

router.get('/register', (req, res) => {
	const creds = req.body

	const ROUNDS = process.env.HASHING_ROUNDS || 8
	const hash = bcrypt.hashSync(creds.password, ROUNDS)

	creds.password = hash

	Users.add(creds)
		.then((user) => {
			res.json(user)
		})
		.catch((err) => res.send(err))
})

router.get('/login', (req, res) => {
	const { username, password } = req.body

	Users.filterFind({ username })
		.then(([user]) => {
			if (user && bcrypt.compareSync(password, user.password)) {
				;(req.session.user = { id: user.id, username: user.username }),
					res.status(201).json({ message: `Welcome ${user.username}` })
			} else {
				res.status(401).json({ message: 'Invalid Login' })
			}
		})
		.catch((error) => {
			res.status(500).json({ message: 'DB Error' })
		})
})

router.get('/logout', (req, res) => {
	req.session
		? req.session.destroy((error) =>
				error
					? res.status(500).json({ error: 'Something went wrong...try again' })
					: res.status(200).json({ success: 'Logged Out' }),
		  )
		: res.status(200).json({ message: 'Already Logged Out' })
})

module.exports = router
