// Load Modules
var fs = require('fs');
var soap = require('soap-ntlm');
var httpntlm = require('httpntlm');

// Load Configuration
var configContent = fs.readFileSync('./settings.json', 'utf8');
var config = JSON.parse(configContent);

// Get WebService
var WebService = require('./NAVWebService');
WebService.username = config.username;
WebService.password = config.password;
WebService.domain = config.domain;
WebService.url = config.serviceURL;
WebService.GetWSDL();

// Create Client and Call WebService Method
soap.createClient(__dirname+'/'+WebService.WsdlFile, function(err, client) {
    if(err) console.log(err);
    
    client.setSecurity(new soap.NtlmSecurity(WebService.username, WebService.password));

    // #001 Hello World
    client.HelloWorld(function(err, res){
        if (err){
            console.log('Function error: ' + err);
            return;
        }        
        WebService.DisplayResult(res);
    });                
    
    // #002 Get Customer Name
    var CustomerNo = '10000';

    client.GetCustomerName({
        'no': CustomerNo
    }, function (err, res){
        if (err)  console.log(err);
        WebService.DisplayResult(res);        
    });   

    // #003 Get Customer Record XML
    var CustomerNo = '10000';
    client.GetCustomer({
        'no': CustomerNo,
        'xMLCustomer': ''
    }, function (err, res){
        if (err) console.log(err);

        WebService.DisplayResult(res);                
    });
});