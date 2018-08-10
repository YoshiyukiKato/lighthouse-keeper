const fs = require("fs");
const Reporter = require("./reporter");

/**
 * output result to csv file
 */
class CsvReporter extends Reporter{
  constructor(outputFilePath){
    super();
    this.outputFilePath = outputFilePath;
    this.headers = null;
  }
  
  open(){
    this.ws = fs.createWriteStream(this.outputFilePath);
  }

  write(result){
    const data = result.getData();
    if(!this.headers){
      this.headers = Object.keys(data);
      this.ws.write(this.headers.join(",") + "\n");
    }
    const row = this.headers.map((header) => {
      return data[header] || "";
    }).join(",");
    this.ws.write(row + "\n");
  }

  close(){
    this.ws.close();
  }
}

module.exports = CsvReporter;