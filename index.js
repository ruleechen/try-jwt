const crypto = require('crypto');

function toBase64(str) {
    const buf = Buffer.from(str, 'utf8');
    const base64 = buf.toString('base64');
    return base64;
}

function trimLastEQ(str) {
    return str
        .replace(/=$/, '');
}

function safeUrl(url) {
    return trimLastEQ(url
        .replace(/_/g, '/')
        .replace(/-/g, '+'));
}

function unsafeUrl(url) {
    return trimLastEQ(url
        .replace(/\//g, '_')
        .replace(/\+/g, '-'));
}

function sign(str) {
    const cipher = crypto.createHmac('sha256', 'rc');
    return cipher.update(str).digest();
}

const header = {
    alg: 'HS256',
};

const payload = {
    sub: 'hello-world',
    test: 'test',
};

const headerStr = safeUrl(toBase64(JSON.stringify(header)));
const payloadStr = safeUrl(toBase64(JSON.stringify(payload)));
const content = `${headerStr}.${payloadStr}`;
const signature = unsafeUrl(toBase64(sign(content)));
const output = `${content}.${signature}`;

console.log(output);
