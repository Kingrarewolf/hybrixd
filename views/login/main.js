// generates json login package
//
// (c)2016 metasync r&d / internet of coins

fs = require('fs');
lzma = require('../../lib/crypto/lz-string.js');

hy_content = ''; // variable to hold package content

// custom-alert code to replace ugly alert boxes with a minimalist solution
hy_content += '<script>'+fs.readFileSync('./js/custom-alert.min.js')+'</script>';

// new account generator code (head)
hy_content += '<script>'+fs.readFileSync('./js/newaccount_A.js')+'</script>';

// new account generator code (body)
hy_content += '<script>'+fs.readFileSync('./js/newaccount_B.js')+'</script>';

// load in the page elements to add to DOM
hy_content += ''+fs.readFileSync('./login.html');

// followed by NaCl (so to use proper encryption)
hy_content += '<script>'+fs.readFileSync('../../lib/crypto/nacl.js')+'</script>';

// including sjcl (pbkdf2 sha256 for key generation)
hy_content += '<script>'+fs.readFileSync('../../lib/crypto/sjcl.js')+'</script>';

// Add global variables
hy_content += '<script>'+fs.readFileSync('./js/globals.js')+'</script>';

hy_content += '<script>'+fs.readFileSync('./js/animations.js')+'</script>'; // Add login animations
hy_content += '<script>'+fs.readFileSync('./js/loginStreams.js')+'</script>';
hy_content += '<script>'+fs.readFileSync('./js/validations.js')+'</script>'; // Add login validations

// and finally the login action handler code
hy_content += '<script>'+fs.readFileSync('./login.js')+'</script>';
hy_content += '<script>'+fs.readFileSync('./login.ui.js')+'</script>';

// hex2base32 for account generator code
hy_content += '<script>'+fs.readFileSync('../../lib/crypto/hex2base32.js')+'</script>';

// hashDJB2 for account validation
hy_content += '<script>'+fs.readFileSync('../../lib/crypto/hashDJB2.js')+'</script>';

// encode hy_content using LZMA (file testing shows URL-safe coding uses 10% less kB)
lzma_result = lzma.compressToEncodedURIComponent(hy_content);

// TODO: sign LZMA string using server pubkey (or central package signing key)


// put it all in json key-values
hy_json = { 'info' : 'compressed view', 'target':'#hy_frame', 'pack' : lzma_result };

// create login.json, use LastModified flag of server for caching???)
fs.writeFileSync('../login.json',JSON.stringify(hy_json));
