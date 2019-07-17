const handleprofile = (req,res,db) => {
    const userid = req.params.id; 
    
    db.select('*').from('users').where({
        id: userid
    }).then(user => {
        if (user.length > 0){
        res.json(user[0]); }
        else {res.status(404).json("user does not exist")}  
    }); 
}

module.exports = {
    handleprofile: handleprofile
}