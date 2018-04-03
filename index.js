const http = require('http'),
fs = require('fs'),
GrowingFile = require('growing-file'),
mime = require('mime-types'),
request = require('request'),
path = require('path');
functionsFIle = require('./functions.js'),
url = '480.mp4',
fileName = path.basename(url);
//request(url).pipe(fs.createWriteStream('docroot/'+fileName));

const server = http.createServer();
server.on('connection', function(){});
server.on('request', function(req, res){
    console.log('[httpServer] Client '+req.socket.localAddress+' Request Url '+req.url);
    if(req.url == '/'){
        if(fs.existsSync('docroot'+req.url)){
            functionsFIle.commands.send('docroot/index.html',req,res);
        }else{
            functionsFIle.commands.error(res);
        }
    }else if(fs.existsSync('docroot'+req.url)){
        functionsFIle.commands.send('docroot'+req.url,req,res);
    }else{
       functionsFIle.commands.error(res);
    }
    req.on('end', function(){
        console.log('[httpServer] Client '+req.socket.localAddress+' End Url '+req.url);
    });
});
server.listen(80, function(){
    console.log('Server started on Port:80');
});
