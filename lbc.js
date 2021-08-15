//npm i request
let request=require("request");
//np, i cheerio
let cheerio=require("cheerio");
//url
let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/royal-challengers-bangalore-vs-sunrisers-hyderabad-eliminator-1237178/ball-by-ball-commentary";

request(url,cb);

function cb(error,response,html){
   if(error){
       console.log(error);
   }
   else if(response.statusCode==404){
       console.log("Page Not Found");
   }
   else{
    //    console.log("html:",html);
    dataExtracter(html);
   }
}

function dataExtracter(html){
    //search tool
    let SearchTool=cheerio.load(html);
    //css selector
    let elemRep = SearchTool(".match-comment-wrapper .match-comment-long-text");
    //text
    let lbc=SearchTool(elemRep[0]).text();
    console.log("lbc:",lbc);
}
console.log("After");



