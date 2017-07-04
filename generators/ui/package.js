var Generator = require('yeoman-generator');
const fs = require('fs');

module.exports = class extends Generator {


    writing (){
        this._generatePackage();
    }

     _generatePackage(projectName,version,projectFolder) {
    var pkg = {
      "name": projectName,
      "version": "\""+version+"\"",
      "dependencies": {},
      "srcDir": projectFolder,
    };
    console.log('json is supposes to be : ',JSON.stringify(pkg));
    console.log(projectFolder+'\\package.json')
    this.fs.writeFile(projectFolder+'\\package.json',JSON.stringify(pkg),(err)=>{
         if (err) throw err;
        console.log('file was written');
    });
};

}

