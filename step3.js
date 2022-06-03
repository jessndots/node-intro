const fs = require('fs');
const axios = require('axios');
const argv = process.argv;


function handleOutput(text, out) {
    if (out) {
        fs.writeFile(out, text, 'utf8', function(error) {
            if (error) {
                console.error(error);
                process.exit(1);
            } else {
                console.log('Successfully wrote to file.');
            }
        });
        
    } else {
        console.log(text);
    }
}

function cat(path, out) {
    fs.readFile(path, 'utf8', function (error, data) {
        if (error) {
            console.log(error);
            process.exit(1);
        } else {
            handleOutput(data, out);
        }
    })
}


async function webCat(url, out) {
    try {
        let resp = await axios.get(url);
        handleOutput(resp.data, out);
    } catch(error) {
        console.error(error);
        process.exit(1);
    }
}

let path;
let out;


if (argv[2]) {
    if (argv[2] === '--out') {
        out = argv[3];
        path = process.argv[4];
    } else {
        path = argv[2];
    }

    if (path.slice(0,4) === 'http') {
        webCat(path, out);
    } else {
        cat(path, out);
    }
}


