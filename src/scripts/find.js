const path = require('path')
const userKey = process.env.USER_KEY || '34e6c6f8c0f1539e21225653c9bd1ac0'

async function find(city, cuisines, max_for_two, res) {
    const exec = require('child_process').exec;

    finderLocation = path.join(__dirname, '../utils/findRes.sh')

    const child = exec(
        `"${finderLocation}"` + ' ' + 
        `"${city}"` + ' ' + 
        `"${cuisines}"` + ' ' + 
        `"${max_for_two}"` + ' ' +
        `"${userKey}"`
    );
    
    const errorResponse="{\"error\": \"Cannot find any restaurants matching your preference\"}"        
    
    child.on('close', (code) => {
        if(code != 0 && !res._headerSent){
            res.status(404).send(JSON.parse(errorResponse))
            res.end()
        }
    });

    child.stderr.on('data', (data) => {
        // console.error("error", data);
        if(!res._headerSent){
            res.status(404).send(JSON.parse(errorResponse))
            res.end()
        }
    });

    child.stdout.on('data', (data) => {
        if(!res._headerSent){
            res.send(JSON.parse(data.toString()))
            res.end()
        }
    });
}

module.exports = find