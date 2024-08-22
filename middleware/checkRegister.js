

module.exports = {
    requireRegister: (req,res,next) => {
        const name = req.body.name;
        const mail = req.body.mail;
        const job = req.body.job;
        const pass = req.body.password;

        const des  = req.body.description;
   console.log(pass)
        if (name === "" || job === "" || pass === "" || des === "") {
            return res.redirect('/register');
        }
        if (mail) {
            const email = /^[^\s@]+@[^\s@]+\.(com)$/;
            if (!email.test(mail)) {
                return res.redirect('/register');
            }
        } else {
            return res.redirect('/register');
        }
        next();
    }
};
