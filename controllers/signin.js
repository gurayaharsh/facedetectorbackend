const handlesignin = (req,res,db,bcrypt) => {

    if(!req.body.email || !req.body.password){
        return res.status(400).json('unexpected input')
    }
    db.select('email','hash').from('login').where('email', '=', req.body.email).then(credentials => {
        const IsValidUser =  bcrypt.compareSync(req.body.password, credentials[0].hash);
        if(IsValidUser){
            return db.select('*').from('users').where('email', '=', req.body.email).then(user => {
                res.json(user[0]);
            }).catch(err => {
                res.status(400).json("incorrect credentials")
            })
            }
        else{
            res.status(400).json("incorrect credentials")
        }}

    )}

    module.exports = {
        handlesignin : handlesignin
    }