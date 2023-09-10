
export const respone = (res, status, success, message, token, rest) => {
    //15days session or the cookie will expire on undefined
    res.status(status).cookie("Session", token === undefined ? null : token, {
        maxAge: token === undefined ? 0 : 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite:process.env.NODE_ENV==="development"? "none":"lax",
        secure:process.env.NODE_ENV==="development"? false:true,
        credentials: true
    }).json({
        success,
        message,
        details: rest
    })

}


