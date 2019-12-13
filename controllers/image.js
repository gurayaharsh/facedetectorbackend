const Clarifai = require('clarifai')

const app = new Clarifai.App({
    apiKey: 'd09319066b3a42188bf8b5da6ec5132f'
  }); 

const handleAPICall = (req,res) => {
  app.models.predict("e466caa0619f444ab97497640cefc4dc", req.body.input).then(data => {
    res.json(data)})
    .catch(err => res.status(400).json('unable to fetch from API'))
  }


const handleEntries = (req,res,db) => {
    
    const id = req.body.id; 
    db('users').where('id', '=', id).increment('entries',1).returning('entries')
    .then(entries => res.json(entries[0])).catch(err => res.status(400).json("unable to get entries"))
}

module.exports = {
    handleEntries, 
    handleAPICall
}