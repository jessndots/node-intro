const fs = require('fs');
const axios = require('axios');
const argv = process.argv;

function cat(path) {
    fs.readFile(path, 'utf8', function (error, data) {
        if (error) {
            console.log(error);
            process.exit(1);
        }
        console.log(data);
    })
}


async function webCat(url) {
    try {
        let resp = await axios.get(url);
        console.log(resp.data)
    }
    catch(error) {
        console.error(error);
        process.exit(1);
    }
}

if (argv[2]) {
if (argv[2].slice(0,4) === 'http') {
    webCat(argv[2]);
} else {
    cat(argv[2])
}
}
