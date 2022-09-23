# Authenticator

This is a Chrome extension for managing TOTP tokens. Tokens can by copy-pasted from the extension's popup window or intelligently inserted into the page using a keyboard shortcut (defaults to `Ctrl+Shift+K` or `Cmd+Shift+K`).

## How to find the 2FA secret

Time-based 2FA apps generate their tokens by combining a secret key (unique to the user of the website) and the current time. The secret key is usually embedded in a QR code that you scan with your phone. Since this extension does not support QR codes, you will have to extract it yourself with one of the many existing [QR decoding tools](https://google.com/search?q=online+QR+code+decoder).

This gives you an [otpauth URL](https://github.com/google/google-authenticator/wiki/Key-Uri-Format), which will look like this:
```
otpauth://totp/Example:alice@google.com?secret=JBSWY3DPEHPK3PXP&issuer=Example
```

In this example, the base32 secret key is "JBSWY3DPEHPK3PXP".
