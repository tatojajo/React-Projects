import jwt_decode from "jwt-decode"

export const isAutenticated = ()=>{
    const token  = localStorage.getItem('token')
    if(!token) return false
    const tokenExpDate = jwt_decode(token).exp
    const dateNow  = Date.now() / 1000
    return dateNow < tokenExpDate
}

