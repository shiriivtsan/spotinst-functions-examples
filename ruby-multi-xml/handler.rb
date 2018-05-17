
 # Implement your function here.
 # The function will get the event as the first parameter with query/body properties:
 # The function should return an Hash

require 'rubygems'
require_relative './bundler/setup' 
require 'multi_xml'

def main(event, context)
    queryparams = event["query"]
    body = event["body"]

    out = MultiXml.parse("<user>Margaret Hamilton</user>")['user'] 

    puts out

    {
        :statusCode => 200,
        :body => out.to_s
    }
end
