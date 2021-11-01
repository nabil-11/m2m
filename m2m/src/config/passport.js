const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../Models/UserModel');

module.exports = (passport) => {
    let config = {};
    config.secretOrKey = process.env.JWT_SECRET;
    config.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

    passport.use(new JwtStrategy(config, async (jwtPayload, done) => { 
        console.log(jwtPayload)
        try {
        
            const user = await User.findById(jwtPayload._id);
            if (user) {
                return done(null, user);
               
            }else {
                return done(null, false);
            }
        }catch(e){
            return done(err, false);
        }
    }));
};