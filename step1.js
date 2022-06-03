const fs = require('fs');
const argv = process.argv;

function cat(path) {
    fs.readFile(path, 'utf8', function (error, data) {
        if (error) {
            console.error(error);
            process.exit(1);
        }
        console.log(data);
    })
}

cat(argv[2])
