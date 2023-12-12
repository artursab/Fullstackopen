sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes


    ![github-large](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=c2VxdWVuY2VEaWFncmFtCiAgICBwYXJ0aWNpcGFudCBicm93c2VyAAcRc2VydmVyCgArBQAdBy0-PgAQBjogR0VUIGh0dHBzOi8vc3R1ZGllcy5jcy5oZWxzaW5raS5maS9leGFtcGxlYXBwL25vdGVzAHUFYWN0aXZhdGUAVwggICAAYwctLT4-AIEFBzogSFRNTCBkb2N1bWVudACBLgVkZQArEABVRW1haW4uY3MAcC10aGUgY3NzIGZpbGUAO2FqAGoxSmF2YVNjcmlwdACBASFOb3RlIHJpZ2h0IG9mAIQCCDogVGhlAIQPCCBzdGFydHMgZXhlY3V0aW5nAFMQY29kZSB0aGF0IGZldGNoZXMAfgZTT04gZnJvbQCCKAUAg39MZGF0YS5qc29uAIQjLFt7ICJjb250ZW50IjogIgCEWQVpcyBlYXN5IiwgImRhdGUiOiAiMjAyMy0xLTEiIH0sIC4uLiBdAIF-PwCCMAYAgg0HY2FsbGJhY2sgZnVuY3Rpb24AgjEGcmVuZGVyAIIxBgCGIwU&s=default)
