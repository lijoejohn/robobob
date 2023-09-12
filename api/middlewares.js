//YOUR SEED FILE
const seed  = require( './db.json' );

module.exports = (req, res, next) => {
    if(req.originalUrl === '/answer')
    {
        const {messages} = seed;
        const result = messages.find(({messageSet})=>{
            const flag = messageSet.some(({messageKey})=>{
                return messageKey===req.body.messageKey
            })
            return flag;
        })
        if(result?.answer)
        return res.jsonp(result)
        res.status(404).jsonp({
            error: "error message here"
        })
    }
    next()
}