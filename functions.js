var methods = {},
fs = require('fs'),
mime = require('mime-types'),
GrowingFile = require('growing-file');

methods.send = function(file,req,res){
    if(mime.lookup(file) == 'video/mp4'){
        fs.readFile(file, function(err,data){
            if(err){
                res.writeHead(200,{'Content-Type': 'text/html'});
                res.write("Error");
                res.end();
            }else{
                res.writeHead(200,{'Content-Type': 'video/mp4'});
                GrowingFile.open(file).pipe(res);
            }
        });
    }else{
        fs.readFile(file, function(err,data){
            if(err){
                res.writeHead(200,{'Content-Type': 'text/html'});
                res.write("Error");
                res.end();
            }else{
                res.writeHead(200,{'Content-Type': mime.lookup(file)});
                res.write(data);
                res.end();
            }
        });
    }
}

methods.error = function(res){
    res.writeHead(200,{'Content-Type': 'text/html'});
    res.write("Error");
    res.end();
        
}

exports.commands = methods;
