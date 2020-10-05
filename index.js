function sfdxcli () {
    this.generateAccessToken = generateAccessToken
}

function generateAccessToken(client_id, url_auth, username, private_key, timeout_s, callback) {
    
    var CryptoJS = require('crypto-js')
    var Crypto = require('crypto')

    var header = {
        'alg': 'RS256'
    };

    var timeoutTimestamp = Math.floor(Date.now() / 1000) + timeout_s

    var data = {
        "iss": client_id,
        "prn": username,
        "aud": url_auth,
        'exp': timeoutTimestamp + 180
    }

    function cleanEncodeBase64(data) {
        cleanedEncode = data.replace(/=+$/, '')
        cleanedEncode = cleanedEncode.replace(/\+/g, '-')
        cleanedEncode = cleanedEncode.replace(/\//g, '_')
        return cleanedEncode
    }
    function base64url(source) {
        encodedSource = CryptoJS.enc.Base64.stringify(source)
        encodeCleanded = cleanEncodeBase64(encodedSource)
        return encodeCleanded
    }

    // encode header
    var stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header))
    var encodedHeader = base64url(stringifiedHeader)

    // encode data
    var stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data))
    var encodedData = base64url(stringifiedData)

    // build token
    var token = `${encodedHeader}.${encodedData}`

    // token + privateKey (RSA+SHA256)
    var signerObject = Crypto.createSign("RSA-SHA256")
    signerObject.update(token)
    var signature = signerObject.sign({key: private_key, padding: Crypto.constants.RSA_PKCS1_PADDING}, "base64")
    signature = cleanEncodeBase64(signature)

    // assertion
    var assertion = `${token}.${signature}`
    
    callback(assertion)

}

module.exports = sfdxcli