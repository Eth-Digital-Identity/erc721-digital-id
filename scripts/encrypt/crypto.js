const cryptoUtils = require('./crypto_utils.js');

//User gives personal data (cc, address, ssn)
let plaintext = 'my message text';
//User gives password
let key = cryptoUtils.getKeyFromPassword("mypassword", cryptoUtils.getSalt());
//Encrypted value put on blockchain
let ciphertext = cryptoUtils.encrypt(plaintext, key);
//Decrypted value read from blockchain
let decryptOutput = cryptoUtils.decrypt(ciphertext, key);

console.log(decryptOutput.toString('utf8'));