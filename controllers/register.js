const handleregister = (req,res,db,bcrypt) => {

    if(!req.body.email|| !req.body.name || !req.body.password){
        return res.status(404).json('unexpected input')
    }
    const hash = bcrypt.hashSync(req.body.password);

    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: req.body.email
        })
        .into('login')
        .returning('email')
        .then(email => {
              return trx('users')
             .returning('*')
             .insert({
                email: email[0],
                name: req.body.name,
                joined: new Date(),
            }).then(user => {
                res.json(user[0]);
            })
        }).then(trx.commit).catch(trx.rollback)
    }).catch(err=>{
        res.status(400).json("unable to register")});
    }

    module.exports = {
        handleregister: handleregister
    }