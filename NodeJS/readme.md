# pre-requisites

## Node Modules
npm install soap-ntlm
npm install httpntlm

## NAV Codeunit Published as a Web Service
HelloWorld() OutPut : Text
EXIT('Hello World');

GetCustomerName(No : Text) : Text
// Name	    DataType	Subtype
// Customer	Record	  Customer	
IF Customer.GET(No) THEN
  EXIT(Customer.Name)
ELSE
  ERROR('Customer %1 not found.', No);

GetCustomer(No : Text;VAR XMLCustomer : XMLport XMLCustomer)
// Name	    DataType	Subtype
// Customer	Record	  Customer	
Customer.SETRANGE("No.", No);
IF Customer.FINDFIRST THEN
  XMLCustomer.SETTABLEVIEW(Customer);

### XML Port: XMLCustomer
Node Name	Prefix	Node Type	Source Type	Data Source
Root		        Element	    Text	    <Root>
Customer		    Element	    Table	    <Customer>(Customer)
No		            Element	    Field	    Customer::No.
Name		        Element	    Field	    Customer::Name
Balance		        Element	    Field	    Customer::Balance (LCY)  