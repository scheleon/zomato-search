async function find(city, cuisines, max_for_two, res) {
    const exec = require('child_process').exec;

    const child = exec(
            __dirname + '/scripts/findRes.sh ' + 
            `"${city}"` + ' ' + 
            `"${cuisines}"` + ' ' + 
            `"${max_for_two}"`,
            function (error, stdout, stderr) {
            });

    child.stderr.on('data', (data) => {
        // console.error(`stderr: ${data}`);
        if(!res._headerSent){
            res.status(404).send({"error": "Cannot find any restaurants matching your preference"})
            res.end()
        }
    });
    
    child.on('close', (code) => {
        // console.log(`child process exited with code ${code}`);
        if(code != 0 && !res._headerSent){
            res.status(404).send({"error": "Cannot find any restaurants matching your preference"})
            res.end()
        }
    });

    child.stdout.on('data', (data) => {
        if(!res._headerSent){
            // console.log(data)
            res.send(JSON.parse(data.toString()))
            res.end()
        }
    });
    // return result
}

module.exports = find