var Generator = require("yeoman-generator");
var PackageUtil = require("./package");

module.exports = class extends Generator {
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);
        // TODO : etoffer le paramétrage.
        this.props = {
            projectParam: {
                name: "awesome-focus-project",
                version: "0.0.1",
                description: "Focus-based app"
            },
            otherParam: {
                hasConfirmed:false,
                installDir:this.destinationRoot()+ "\\awesome-focus-project",
            }
        };
    }
    initializing() {}

    writing() {
        if(!!this.props.otherParam.hasConfirmed) {
            this._copyTemplate();
        }
        else{
            this.log('-- INSTALL ABORTED --')
        }
    }

    install() {

        if(!!this.props.otherParam.hasConfirmed) {
            this.log("\n TODO : IMPLEMENTER LE NPM INSTALL");
        }
        else{
            this.log('-- INSTALL ABORTED --')
        }
    }

    prompting() {
        return this._promptProjectName().then(() => {
            return this._promptProjectDestinationFolder();
        });
    }

    _promptProjectName() {
        return this.prompt([
            {
                type: "input",
                name: "name",
                message: "Quel est le nom de votre projet ?",
                default: this.props.projectParam.name // Default to current folder name
            }
        ]).then(answers => {
            this.props.projectParam.name = answers.name;
        });
    }
    _promptProjectDestinationFolder() {
        let focusProjectInstallDir =
            this.destinationRoot() + "\\" + this.props.projectParam.name;
        return this.prompt([
            {
                type: "confirm",
                name: "hasConfirmed",
                message: "Votre projet va être crée dans le répertoire : " +
                    focusProjectInstallDir +
                    "\n Confirmez-vous?"
            }
        ]).then(answers => {
            if(!!answers.hasConfirmed){
                this.props.otherParam.installDir=focusProjectInstallDir;
            }
            this.props.otherParam.hasConfirmed=answers.hasConfirmed;
        });
    }
    _copyTemplate() {
        // Copie le template (focus-starter-kit), en modificant le package.json
        let pkgProps = {
            name: this.focusProjectName,
            version: "0.1.0",
            description: "Une simple description"
        };
        this.fs.copyTpl(
            this.templatePath("focus-app"),
            this.props.otherParam.installDir,
            this.props.projectParam
        );
    }
};
