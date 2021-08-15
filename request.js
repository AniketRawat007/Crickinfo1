//npm i request
let request=require("request");
let cheerio=require("cheerio");
request(`https://www.npmjs.com/package/cheerio`,cb);

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
    let elemRep = SearchTool("#readme>h1");
    //text
    let moduleName=elemRep.text().trim();
    console.log("ModuleName:",moduleName);
}
console.log("After");