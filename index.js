
function sfdxcli () {
    this.auth = auth;
}

function auth (username) {

    cy.exec(`sfdx force:org:display -u ${ username } --json`)
    .then((response) => {

        var data = response.stdout;
        data = data.replace(/..[0-9]+m/g, '');

        let result = JSON.parse(data).result;
        let sessionId = result.accessToken;
        let instanceUrl = result.instanceUrl;

        cy.request(`${instanceUrl}/secur/frontdoor.jsp?sid=${sessionId}`)
        .then(() => {
            debugger
            cy.visit(`${instanceUrl}/lightning`)
        })
    })
}
module.exports = sfdxcli