import fs from 'fs';
const fsPromises = fs.promises;
import csv from "csvtojson";
const csvFilePath='./csv/nodejs-hw1-ex1.csv';
import regeneratorRuntime from "regenerator-runtime";

async function readFromFile(){
    const jsonArray=await csv({
        noheader: false,
        headers: ['book','author', 'amount', 'price'],
    }).fromFile(csvFilePath);
    write(jsonArray);
}

async function write(data){
    try{
        for(let i=0; i<data.length;i++){
            if(i===0){
                await fsPromises.writeFile('./nodejs19-hw1-ex2.txt', JSON.stringify(data[i]));
                await fsPromises.appendFile('./nodejs19-hw1-ex2.txt', '\n')
                continue;
            }
            await fsPromises.appendFile('./nodejs19-hw1-ex2.txt', JSON.stringify(data[i]));
            await fsPromises.appendFile('./nodejs19-hw1-ex2.txt', '\n')
        }
           
    }catch(e){
        console.error(e.message)
    }
    
}
readFromFile();