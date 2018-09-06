const S3Reporter = require("./s3-reporter");

class S3CsvReporter extends S3Reporter{
  constructor(s3, bucketName, key){
    super(s3, bucketName, key);
  }

  write(result){
    if(!this.headers){
      this.headers = Object.keys(result);
      this.body += (this.headers.join(",") + "\n");
    }
    this.body += (this.headers.map((header) => {
      return result[header] || "";
    }).join(",") + "\n");
  }
}

module.exports = S3CsvReporter;