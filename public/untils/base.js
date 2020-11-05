const crypto = require('crypto');
const captcha = require('trek-captcha')

const setCrypto = (info)=>{
	return crypto.createHmac('sha256', '$%$%^jfdkf')
            .update(info)
            .digest('hex');
};

const createVerify = (req) => {
    return captcha({ size: 4, style: -1 }).then(res => {
        req.session.captcha = res.token;
        return res.buffer.toString('base64');
    })
}

module.exports = {
    setCrypto,
    createVerify
};