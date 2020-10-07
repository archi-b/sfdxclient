# sfdxclient

### 1. Install lib in your code
```bash
npm install @sfdxclient/common crypto-js crypto
```

### 2. How use this lib

```javascript
import sfdxclient from '@sfdxclient/common'
const path = require('path')
const sfdx = new sfdxclient

// private
let clientId = "YOUR-CONSUMER-KEY"
let urlAuth = "https://test.salesforce.com"
let username = "YOUR-USERNAME-SALESFORCE"
let timeout_s = 180
let privateKey = '-----BEGIN RSA PRIVATE KEY-----\n' + 
    '---------YOUR-PRIVATE-KEY-HERE----------\n' + 
    '-----END RSA PRIVATE KEY-----'
    
sfdx.OAuth2Assertion(clientId, urlAuth, username, privateKey, timeout_s, (response) => {
    console.log(`assertion: ${response}`)

    /// --- WRITE YOUR REQUEST HTTP POST HERE --- ///
})
```

### 2. Example http request to get your credentials in curl
```bash
curl --location --request POST 'https://test.salesforce.com/services/oauth2/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer' \
--data-urlencode 'assertion=<YOUR-ASSERTION-HERE>'
```

#### 2.1 Example response
```json
{
    "access_token":"00Dxx0000001gPL!AR8AQJXg5oj8jXSgxJfA0lBog.39AsX.LVpxezPwuX5VAIrrbbHMuol7GQxnMeYMN7cj8EoWr78nt1u44zU31IbYNNJguseu",
    "scope":"web openid api id",
    "instance_url": "https://yourInstance.salesforce.com",
    "id": "https://yourInstance.salesforce.com/id/00Dxx0000001gPLEAY/005xx000001SwiUAAS",
    "token_type":"Bearer"
}
```

### 3. Accessing Salesforce
#### 3.1 Request HTTP
```bash
curl --location --request POST 'https://test.salesforce.com/id/00D8A0000005hEGUAY/0053c00000BpXI1AAN' \
--header 'Authorization: Bearer <YOUR-ACCESS-TOKEN-HERE>'
```

#### 3.2 Navigate in your browser
```
https://<YOUR-ORG>.my.salesforce.com/secur/frontdoor.jsp?sid=<YOUR-ACCESS-TOKEN-HERE>
```