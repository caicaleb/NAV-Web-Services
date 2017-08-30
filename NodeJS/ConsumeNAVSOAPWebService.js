/* 
# Install SOAP NTLM: 
npm install soap-ntlm 
Website: https://www.npmjs.com/package/soap-ntlm

# Install HTTP NTLM: 
npm install httpntlm 
Website: https://www.npmjs.com/package/httpntlm
*/

var soap = require('soap-ntlm');
var fs = require('fs');
var httpntlm = require('httpntlm');
  
var url = 'http://localhost:7047/DynamicsNAV100/WS/CRONUS%20UK%20Ltd./Codeunit/NAVServiceTest';
var username = 'username';
var password = 'password';
var domain = 'domain';

httpntlm.get({
    url: url,
    password: password,
    username: username,
    domain: domain
}, function(err, wsdl){
 
    if (err)
    {
        console.log('Error:');
        console.log(err);
    }
    else
    {
        console.log('WSDL: ');
        console.log(wsdl);   
    }

    var CurrentDirection = __dirname;
    
    fs.writeFile(CurrentDirection+'/NAVwebservice.wsdl', wsdl.body, function(){
        soap.createClient(CurrentDirection+'/NAVwebservice.wsdl', function(err, client) {
            if(err){
                console.log(err);
                return;
            }
            else
            {
                client.setSecurity(new soap.NtlmSecurity(username, password));

                client.SayHi(function(err, res){
                    console.log('Result from NAV: ');
                    console.log(res);
                    return;
                });               
            }
        });
    });
});
 