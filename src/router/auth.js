export default function guest ({ next }){
    if(!localStorage.token){
        return next({
           name: '#/login'
        })
    }
   
    return next()
   }