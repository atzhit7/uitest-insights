# How to use (standalone)

1. clone this repository
1.      npm i
1.      node .\portal\sample\dev-portal1.js

Run the code with cli paramters sample:

    node .\portal\sample\dev-portal1.js url=https://fqdn/portal user=portaluser password=portaluserpassword browsers=chromium,firefox --head --notification

other option:
if you want to use the config file. Try the following code:

    node .\portal\sample\dev-portal1.js inputjson=.\input.json --head --notification
