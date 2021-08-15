//npm i request
let request = require("request");
let cheerio = require("cheerio");
let fs=require("fs");
//url
let url =" https://www.espncricinfo.com/series/ipl-2020-21-1210595/royal-challengers-bangalore-vs-sunrisers-hyderabad-eliminator-1237178/full-scorecard";
//  let request = require("request");
// let cheerio = require("cheerio");
// const { fstat } = require("fs");
  request(url, cb);

function cb(error, response, html) {
    if (error) {
        console.log(error);
    }
    else if (response.statusCode == 404) {
        console.log("Page Not Found");
    }
    else {
        //    console.log("html:",html);
        dataExtracter(html);
    }
}

function dataExtracter(html) {
    //search tool
    let SearchTool = cheerio.load(html);
    //global tool
    //page ->tables -> row get
    let bowlers=SearchTool(".table.bowler tbody tr");

    for(let i=0;i<bowlers.length;i++){
        //row->col
        let cols=SearchTool(bowlers[i]).find("td");
        let aElem=SearchTool(cols[0]).find("a");
        let link=aElem.attr("href");
        //link
        //new page -> link get -> complete ->request
        let fulllLink=`https://www.espncricinfo.com${link}`;
        request(fulllLink,newcb);
    }
}
    function newcb(error,response,html){
        if(error){
            console.log(error);
        }
        else if(response.statusCode==404){
            console.log("Page Not Found");
        }
        else{
            console.log("```````````````````````````");
            getBirthDay(html);
        }
    }
    function getBirthDay(html){
        let searchTool=cheerio.load(html);
        let headingArr=searchTool(".player-card-description");
        let age=searchTool(headingArr[2]).text();
        let name=searchTool(headingArr[0]).text();
        console.log(name," ",age);
            
        }
    

console.log("After");