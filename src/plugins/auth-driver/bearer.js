module.exports = {

    request: function (req, token) {
        this.options.http._setHeaders.call(this, req, {Authorization: 'Bearer ' + token});
    },

    response: function (res) {

        var headers = this.options.http._getHeaders.call(this, res),
            token = res.data.access_token

        if (token) {
            return token
        }
    }
};
