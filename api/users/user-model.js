const db = require('../data/dbConfig')



const find = () => {
  return db('users').select('id', 'username').orderBy('id')
}

const findById = (id) => {
  return db('users').select('id', 'username').where({ id }).first()
}
const add = (user) => {
   return db('users')
			.insert(user)
			.then((ids) => {
				return findById(ids[0])
			})
}
  

const filterFind = (filter) => {
  return db('users').where(filter).orderBy('id')
}



module.exports = {
  find,
  findById,
  add,
  filterFind,
}

