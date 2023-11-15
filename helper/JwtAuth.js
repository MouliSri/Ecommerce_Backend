const {expressjwt} = require('express-jwt');




const authJwt =()=>{
  return  expressjwt({
secret:process.env.SECREAT_KEY,
algorithms: ["HS256"],
isRevoked:isRevoked
}).unless({ path: [{url:/\/api\/v1\/products(.*)/ ,methods:['GET','OPTIONS']},{url:/\/api\/v1\/category(.*)/ ,methods:['GET','OPTIONS']},{url:/\/api\/v1\/orders(.*)/ ,methods:['GET','POST','OPTIONS']},'/api/v1/users/login','/api/v1/users/register'] });

}

async function isRevoked(req, jwt) {
    const payload = jwt.payload
    return !payload.Admin

}


module.exports = authJwt;