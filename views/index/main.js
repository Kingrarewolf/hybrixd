// generates ../index.html (static file to serve ajax calls)
//
// only used server side when code changes
// (we might want to use browserify later)
//

fs = require('fs');

hy_page = ''; // create initial var to generate html string

// opening tags
hy_page += '<html><head>';

// may need to include view-port code in header

// title
hy_page += '<title>Internet of Coins wallet</title>';
hy_page += '<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=0.5, maximum-scale=2.0" content="text/html;charset=UTF-8" />';

// load in the style sheets
hy_page += '<style>' + fs.readFileSync('./css/styles.css') + '</style>';

// close header open body
hy_page += '</head><body id="body">';

hy_page += '<img class="logo" src="data:image/png;base64,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" />';

hy_page += '<noscript><div class="javascript-warning"><h2>Javascript is required</h2><p>We\'re sorry, but the internet of coins...</p><p>Please visit...</p></div></noscript>';

// insert the framework div
hy_page += '<div id="hy_frame"></div>';

// followed by jquery (so to make ajax calls)
hy_page += '<script>' + fs.readFileSync('./jquery-1.12.4.min.js') + '</script>';

// UTILS
hy_page += '<script>' + fs.readFileSync('./utils.js') + '</script>';

hy_page += '<script>' + fs.readFileSync('./../files/svg/black.js') + '</script>';

hy_page += '<script>' + fs.readFileSync('./../interface/js/deterministic.js') + '</script>';
hy_page += '<script>' + fs.readFileSync('./../interface/js/ychan.js') + '</script>';
hy_page += '<script>' + fs.readFileSync('./../interface/js/zchan.js') + '</script>';
hy_page += '<script>' + fs.readFileSync('./../interface/js/proofOfWork.js') + '</script>';
hy_page += '<script>' + fs.readFileSync('./../interface/js/storage.js') + '</script>';
hy_page += '<script>' + fs.readFileSync('./../interface/js/hybriddcall.js') + '</script>';
hy_page += '<script>' + fs.readFileSync('./../interface/js/assetInitialization.js') + '</script>';

// lzma-decompressor
hy_page += '<script>' + fs.readFileSync('../../lib/crypto/lz-string.js') + '</script>';

// and finally the hybrid connector
hy_page += '<script>' + fs.readFileSync('./hy_connect.js') + '</script>';

// RAmda
hy_page += '<script>' + fs.readFileSync('./ramda.min.js') + '</script>';

// RxJS
hy_page += '<script>' + fs.readFileSync('./rx.min.js') + '</script>';

// COMMON UTILS BETWEEN WEB AND CLI WALLET
hy_page += '<script>' + fs.readFileSync('./../../common/index.js') + '</script>';

// close document
hy_page += '</body></html>';

// write to higher directory file
fs.writeFileSync('../index.html', hy_page);
