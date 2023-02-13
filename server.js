const http = require('http');
const url = require("url");
const fs = require("fs");
const Handle=require('./controller/Handler/Handle')

const server=http.createServer((req, res)=>{
    let urlPath = url.parse(req.url).pathname;
    switch (urlPath){
        case '/':
            Handle.Homepage(req,res).catch(err=>{
                console.log(err.message)
            });
            break;
        case '/city':
            Handle.ShowList(req,res).catch(err=>{
                console.log(err.message)
            });
            break;
        case '/add':
            Handle.addCity(req,res).catch(err=>{
                console.log(err.message)
            });
            break;
        case '/city/delete':
            Handle.deleteCity(req,res).catch(err=>{
                console.log(err.message)
            });
            break;
        case '/city/update':
            Handle.updateFormCity(req,res).catch(err=>{
                console.log(err.message)
            });
            break;
        case '/city/detail':
            Handle.detailFormCity(req,res).catch(err=>{
                console.log(err.message)
            });
            break;
        case '/list/update':
            Handle.updateCityList(req,res).catch(err=>{
                console.log(err.message)
            });
            break;

            default:
            res.end();
            break;

    }
});
server.listen(8080,()=>{
    console.log('Server is running at localhost:8080')
});