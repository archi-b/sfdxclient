var sfdxclient = require('./index.js')

const clientId = "<CLIENT-ID>"
const urlAuth = "https://test.salesforce.com"
const username = "<username@dns.com>"
const timeout_s = 180
const privateKey = '-----BEGIN RSA PRIVATE KEY-----\n' +
'..................................................\n' +
'-----END RSA PRIVATE KEY-----'

sfdxclient.OAuth2Assertion(clientId, urlAuth, username, privateKey, timeout_s, (response) => {
    console.log("Assertion: " + response)
})