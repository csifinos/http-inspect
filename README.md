# http-inspect

![node-lts](https://img.shields.io/node/v-lts/%40csifinos%2Fhttp-inspect)
![license](https://img.shields.io/github/license/csifinos/http-inspect)
![version](https://img.shields.io/github/package-json/v/csifinos/http-inspect)

**http-inspect** is a simple command-line tool that logs and inspects HTTP requests and responses in real-time.
It's useful for debugging and monitoring HTTP traffic during development.

### 🚨 Important
This tool is for development only and should not be used in production.
It lacks security features and could expose sensitive data.
http-inspect is not a security tool. Use it only for testing your own services or with permission.

### Features

- Logs raw HTTP requests and responses.
- Displays data in both text and hexadecimal formats for easy debugging.
- Lets you configure the port and target URL for flexible testing.

### Installation
Install globally using npm:

```bash
npm install -g @csifinos/http-inspect
```

### How to Use
Run the tool from the command line:

```bash
  Usage: http-inspect [options] v${VERSION}

  A lightweight CLI tool for logging and inspecting HTTP requests and responses for development purposes.

  Options:
    -p, --port <number>     Port to run the proxy server on
    -t, --target <url>      Target URL to forward requests to
    -v, --version           Show the version
    -h, --help              Display this help message

  Example:
    http-inspect --port 3000 --target http://example.com
```

### License
This tool is licensed under the MIT License.
You can use, modify, and distribute it freely.
