#!/usr/bin/env node
(async()=>{
    const util = require('util')
    const fs = require('fs')
    const exec = require('child_process').exec
    const execAsync = util.promisify(exec)
    const renameAsync = util.promisify(fs.rename)
    const rimrafAsync = require('./removeDir')
    const [,, ...args] = process.argv
    try {
        if(process.argv[2]==="express"){
            console.log(`Downloading express-starter-pack...`)
            const child = await execAsync('git clone --depth=1 https://github.com/kosinix/express-starter-pack.git .')
            console.log(child.stdout || child.stderr)
            console.log(`Removing .git directory...`)
            await rimrafAsync('.git')
        } else if(process.argv[2]==="whoispogi"){
            console.log("Nico Amarilla")
        } else if(process.argv[2]==="v"){
            let package = fs.readFileSync('./package.json', { encoding: 'utf8' });
            let packageJson = JSON.parse(package);
            console.log(packageJson.version)
        } else {
            console.error("Bad command")
        }
    } catch (err){
        console.error(err.message)
    }
})()