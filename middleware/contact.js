

module.exports = {
    requireContact: (req,res,next) =>{
        const mail = req.body.mail;
        if(mail){
           const email = /^[^\s@]+@[^\s@]+\.(com)$/;
           if(email.test(mail)){
               next();
           }else{
            
             res.redirect('/contact')
           }

            }
        }
    }
