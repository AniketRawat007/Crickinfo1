//npm i request
let request = require("request");
//npm i cheerio
let cheerio = require("cheerio");
let fs=require("fs");
//url
let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/royal-challengers-bangalore-vs-sunrisers-hyderabad-eliminator-1237178/full-scorecard";
console.log("before");
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
    // let bowlerTables=SearchTool(".table.bowler")
    let bowlers=SearchTool(".table.bowler tbody tr ")
    // console.log(bowlerTables.length);
    // let htmlData="";
    // for(let i=0;i<bowlerTables.length;i++){
    //     //html function
    //     htmlData+=SearchTool(bowlerTables[i]).html();
    // }
    // fs.writeFileSync("table.html",htmlData);
     //loop 
     //name
     let hwicket=0;
     let bname="";
     for(let i=0;i<bowlers.length;i++){
         let cols=SearchTool(bowlers[i]).find("td");
         let names=SearchTool(cols[0]).text();
         let wickets=SearchTool(cols[4]).text();
         console.log(names+" "+wickets);
         if(hwicket<wickets){
             hwicket=wickets;
             bname=names;
         }
        
     }
     console.log("````````````````````````````````````")
     console.log(bname+" "+hwicket);
    
}
console.log("After");
