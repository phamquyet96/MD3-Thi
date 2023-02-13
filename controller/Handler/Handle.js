const BaseHandle=require('./baseHandle');
const qs = require("qs");
const fs = require("fs");
const url = require("url");

class Handle extends BaseHandle{
    async Homepage(req, res) {
        let html = await this.getTemplate('./views/homepage.html');
        res.write(html);
        res.end();
    };

    async ShowList(req, res) {
        let html = await this.getTemplate('./Views/crud/read.html');
        let sql = 'SELECT * from city';
        let products = await this.getSQL(sql);
        console.log(products)

        let newHtml = '';
        products.forEach((product, index) => {
            newHtml += `<tr>`
            newHtml += `<td>${index + 1}</td>`
            newHtml += `<td>${product.namecity}</td>`
            newHtml += `<td>${product.country}</td>`
            newHtml += `<td>${product.area}</td>`
            newHtml += `<td>${product.population}</td>`
            newHtml += `<td>${product.gdp}</td>`
            newHtml += `<td>${product.describee}</td>`
            newHtml += `<td><a onclick="return confirm('Are you sure want to this product?')" href="/city/delete?id=${product.id}"  class="btn btn-danger">Delete</a>     
                             <a href="/city/update?id=${product.id}" class="btn btn-primary">Update</a>
                             <a href="/city/detail?id=${product.id}" class="btn btn-warning">Detail</a></td>   `
            newHtml += `</tr>`
        })
        html = html.replace('{list-city}', newHtml);
        res.write(html);
        res.end();
    }

    async addCity(req,res){
        if (req.method === 'GET') {
            let html = await this.getTemplate('./views/crud/create.html');
            res.write(html);
            res.end();
        } else {
            let data='';
            req.on('data',chunk=>{
                data+=chunk;
            });
            req.on('end',async ()=>{
                let dataForm=qs.parse(data);
                let sql=`insert into city(namecity,country,area,population,gdp,describee) values ('${dataForm.name}','${dataForm.country}','${dataForm.area}','${dataForm.population}','${dataForm.gdp}','${dataForm.describee}')`;
                await this.getSQL(sql);
                res.writeHead(301,{Location:'/city'});
                res.end();
            })
        }
    }

    async deleteCity(req,res){
        let query=url.parse(req.url).query;
        let id=qs.parse(query).id;
        let sql=`DELETE FROM city where id=${id}`;
        await this.getSQL(sql);
        res.writeHead(301,{Location:'/city'});
        res.end();
    }

    async updateFormCity(req,res){
        let html=await this.getTemplate('./views/crud/form.html');
        let query=url.parse(req.url).query;
        let id=qs.parse(query).id;
        let sql=`SELECT * FROM city where id=${id}`;
        let data= await this.getSQL(sql);

        html=html.replace('{id}',data[0].id);
        html=html.replace('{namecity}',data[0].namecity);
        html=html.replace('{country}',data[0].country);
        html=html.replace('{area}',data[0].area);
        html=html.replace('{population}',data[0].population);
        html=html.replace('{gdp}',data[0].gdp);
        html=html.replace('{describee}',data[0].describee);
        res.write(html);
        res.end();
    }

    async detailFormCity(req,res){
        let html=await this.getTemplate('./views/crud/detail.html');
        let query=url.parse(req.url).query;
        let id=qs.parse(query).id;
        let sql=`SELECT * FROM city where id=${id}`;
        let data= await this.getSQL(sql);

        html=html.replace('{id}',data[0].id);
        html=html.replace('{namecity}',data[0].namecity);
        html=html.replace('{country}',data[0].country);
        html=html.replace('{area}',data[0].area);
        html=html.replace('{population}',data[0].population);
        html=html.replace('{gdp}',data[0].gdp);
        html=html.replace('{describee}',data[0].describee);
        res.write(html);
        res.end();
    }

    async updateCityList(req,res){
        let query=url.parse(req.url).query;
        let id=qs.parse(query).id;
        let data='';
        req.on('data',chunk=>{
            data+=chunk;
        });
        req.on('end',async ()=>{
            let dataForm=qs.parse(data);
            let sql=`update city set namecity='${dataForm.name}',country='${dataForm.country}',population='${dataForm.population}',gdp='${dataForm.gdp}',describee='${dataForm.describee}' where id=${id}`;
            await this.getSQL(sql);
            res.writeHead(301,{Location:'/city'});
            res.end();
        })
    }



}
module.exports=new Handle();