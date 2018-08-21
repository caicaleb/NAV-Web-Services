using System;
using System.IO;
using System.Net;
using System.Xml;

namespace DotNetUsingHttpWebRequest
{
    class Program
    {
        static void Main(string[] args)
        {
            string ServiceURL = "http://localhost:8047/Prototypes/WS/CRONUS%20UK%20Ltd./Codeunit/TestService";
            var action = string.Format("{0}?{1}", ServiceURL, "op=GetCustomers");

            string XmlRequest = File.ReadAllText(@"C:\GitHub\NAV-Web-Services\DotNetUsingHttpWebRequest\DotNetUsingHttpWebRequest\SoapRequest.xml");
            XmlDocument soapEnvelopeXml = CreateSoapEnvelope(XmlRequest);
            HttpWebRequest webRequest = CreateWebRequest(ServiceURL, "POST", action);
            webRequest.UseDefaultCredentials = true;
            InsertSoapEnvelopeIntoWebRequest(soapEnvelopeXml, webRequest);

            IAsyncResult asyncResult = webRequest.BeginGetResponse(null, null);
            asyncResult.AsyncWaitHandle.WaitOne();

            string soapResult = string.Empty;
            using (WebResponse webResponse = webRequest.EndGetResponse(asyncResult))
            {
                using (StreamReader rd = new StreamReader(webResponse.GetResponseStream()))
                {
                    soapResult = rd.ReadToEnd();
                }                
            }

            ShowResult(soapResult);

        }
        private static HttpWebRequest CreateWebRequest(string url, string HttpMethod, string action)
        {
            HttpWebRequest webRequest = (HttpWebRequest)WebRequest.Create(url);
            webRequest.Headers.Add("SOAPAction", action);
            webRequest.ContentType = "text/xml;charset=\"utf-8\"";
            webRequest.Accept = "text/xml";
            webRequest.Method = HttpMethod;
            return webRequest;
        }
        private static XmlDocument CreateSoapEnvelope(string MyRequestXML)
        {
            XmlDocument soapEnvelopeDocument = new XmlDocument();
            soapEnvelopeDocument.LoadXml(MyRequestXML);
            return soapEnvelopeDocument;
        }
        private static void InsertSoapEnvelopeIntoWebRequest(XmlDocument soapEnvelopeXml, HttpWebRequest webRequest)
        {
            using (Stream stream = webRequest.GetRequestStream())
            {
                soapEnvelopeXml.Save(stream);
            }
        }
        private static void ShowResult(string ResultXML)
        {
            XmlDocument ResponseXml = new XmlDocument();
            ResponseXml.LoadXml(ResultXML);

            XmlNodeList NodeList = ResponseXml.SelectNodes("//*");
            foreach (XmlNode Node in NodeList)
            {
                Console.WriteLine("{0}: {1}", Node.Name, Node.InnerText);
            }
        }
    }
}
