// Load Modules
var fs = require('fs');
var soap = require('soap-ntlm');
var httpntlm = require('httpntlm');

var NAVWebService = {
    url: "",
    username: "",
    password: "",
    domain: "",
    WsdlFile: "NAVwebservice.wsdl",

    GetWSDL: function(){
        httpntlm.get({
            url: this.url,
            username: this.username,
            password: this.password,
            domain: this.domain
        }, function (err, wsdl) {
            if (err)  console.log('Error: ' + err);
                
            fs.writeFile('./NAVwebservice.wsdl', wsdl.body, function(){
                if (err) console.log(err);
                
                console.log("WSDL download complete.");
                
            });
        });
    },

    DisplayResult: function(result){
        console.dir('Result from NAV: ' + JSON.stringify(result));
    }
}

module.exports = NAVWebService;