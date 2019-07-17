const Clarifai = require('clarifai')

const app = new Clarifai.App({
    apiKey: '3dabb3c6ec5141b7ba4885f1636c9016'
  }); 

const handleAPICall = (req,res) => {
  app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input).then(data => {
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