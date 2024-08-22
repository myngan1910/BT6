module.exports = {
    requireComment: (req,res,next) => {
        const id  = parseInt(req.params.ID)
        const message = req.body.message;
        if( message === "") {
            res.redirect(`/post/${id}`)
        } else {
            next();
        }
    }
}