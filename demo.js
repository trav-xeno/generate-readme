"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs_1 = require("fs");
var chalk = require("chalk");
var axios_1 = require("axios");
var inq = require("inquirer");
var BadgeFactory = require("gh-badges").BadgeFactory;
var bf = new BadgeFactory();
//console.table
//group and chack to color command line
//used to store all the usefull read me string formmating will ad methods that foramt each section accrodingly
var Readme = /** @class */ (function () {
    function Readme(title, descripting, installation, useage, license, contributating, test, avatar_url, email, username, contents) {
        this.title = title;
        this.description = descripting;
        if (contents != undefined || contents != null) {
            this.contents = contents;
        }
        this.installation = installation;
        this.contributing = contributating;
        this.usage = useage;
        this.license = license;
        this.test = test;
        this.avatar = avatar_url;
        this.username = username;
        this.email = email;
    }
    return Readme;
}());
//-------------------------------------
//   validation section
//-------general validation for number inputs and empty strings all not allowed unless for certain questions--------------------
var checkInput = function (input) { return __awaiter(void 0, void 0, void 0, function () {
    var matches;
    return __generator(this, function (_a) {
        matches = input.match(/\d+/g);
        if (input === "" || matches != null) {
            return [2 /*return*/, "Title can not contain numbers nor can it be empty! please enter again: "];
        }
        return [2 /*return*/, true];
    });
}); };
var validate = function (input) {
    if (input === "") {
        return "This can not be empty! If you are unsure what totype just put filler text in. Please enter again: ";
    }
    return true;
};
var userExists = function (username) { return __awaiter(void 0, void 0, void 0, function () {
    var err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1["default"].get("https://api.github.com/users/" + username)];
            case 1:
                _a.sent();
                return [2 /*return*/, true];
            case 2:
                err_1 = _a.sent();
                return [2 /*return*/, false];
            case 3: return [2 /*return*/];
        }
    });
}); };
var testUser = function (input) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = input !== "";
                if (!_a) return [3 /*break*/, 2];
                return [4 /*yield*/, userExists(input)];
            case 1:
                _a = (_b.sent()) == true;
                _b.label = 2;
            case 2:
                if (_a) {
                    return [2 /*return*/, true];
                }
                else {
                    return [2 /*return*/, "This user could not be found! please try it again:"];
                }
                return [2 /*return*/];
        }
    });
}); };
//-------------------------------------------
//  question section
//starting questoins
var startingQuestions = function () {
    return inq.prompt([
        {
            type: "input",
            name: "title",
            message: chalk.blue("What is the name of the projects? "),
            validate: checkInput
        },
        {
            type: "input",
            name: "username",
            message: chalk.blue("Enter your username please: "),
            validate: testUser
        }
    ]);
};
//----------------------------------------------------
//ask yes or no for testing contributors and table of contents
var secondaryQuestoins = function () {
    return inq.prompt([
        {
            type: "confirm",
            name: "testing",
            message: chalk.blue("Would you like a testing section?")
        },
        {
            type: "confirm",
            name: "contributing",
            message: chalk.blue("Would you like a contributing section?")
        }
    ]);
};
var fromatingQuestoins = function (testing, contributing) { return __awaiter(void 0, void 0, void 0, function () {
    var senario1, senario2, senario3;
    return __generator(this, function (_a) {
        senario1 = testing == true && contributing == true;
        senario2 = testing == false && contributing == false;
        senario3 = testing == true && contributing == false;
        console.log("Use \\n for new lines! Enter will cause you to go to tthe next section.");
        if (senario1) {
            return [2 /*return*/, inq.prompt([
                    {
                        type: "input",
                        name: "description",
                        message: chalk.blue("Add text to the description section:"),
                        validate: validate
                    },
                    {
                        type: "confirm",
                        name: "contents",
                        message: chalk.blue("Would you like a table of contents?")
                    },
                    {
                        type: "input",
                        name: "installation",
                        message: chalk.blue("Add text to the installation section: "),
                        validate: validate
                    },
                    {
                        type: "input",
                        name: "useage",
                        message: chalk.blue("Add text to the useage section: "),
                        validate: validate
                    },
                    {
                        type: "input",
                        name: "license",
                        message: chalk.blue("Add a license section:"),
                        validate: validate
                    },
                    {
                        type: "input",
                        name: "contributing",
                        message: chalk.blue("Add text to the contributing section:"),
                        validate: validate
                    },
                    {
                        type: "input",
                        name: "testing",
                        message: chalk.blue("Add text to the testing section: "),
                        validate: validate
                    }
                ])];
        }
        else if (senario2) {
            return [2 /*return*/, inq.prompt([
                    {
                        type: "input",
                        name: "description",
                        message: chalk.blue("Add text to the description section:"),
                        validate: validate
                    },
                    {
                        type: "confirm",
                        name: "contents",
                        message: chalk.blue("Would you like a table of contents?")
                    },
                    {
                        type: "input",
                        name: "installation",
                        message: chalk.blue("Add text to the installation section:"),
                        validate: validate
                    },
                    {
                        type: "input",
                        name: "useage",
                        message: chalk.blue("Add text to the useage section:"),
                        validate: validate
                    },
                    {
                        type: "input",
                        name: "license",
                        message: chalk.blue("Add a license section:"),
                        validate: validate
                    }
                ])];
        }
        else if (senario3) {
            return [2 /*return*/, inq.prompt([
                    {
                        type: "input",
                        name: "description",
                        message: chalk.blue("Add text to the description section:"),
                        validate: validate
                    },
                    {
                        type: "input",
                        name: "installation",
                        message: chalk.blue("Add text to the installation section:"),
                        validate: validate
                    },
                    {
                        type: "confirm",
                        name: "contents",
                        message: chalk.blue("Would you like a table of contents?")
                    },
                    {
                        type: "input",
                        name: "useage",
                        message: chalk.blue("Add text to the useage section:"),
                        validate: validate
                    },
                    {
                        type: "input",
                        name: "license",
                        message: chalk.blue("Add a license: "),
                        validate: validate
                    },
                    {
                        type: "input",
                        name: "testing",
                        message: chalk.blue("Add text to the testing section: "),
                        validate: validate
                    }
                ])];
        }
        else {
            return [2 /*return*/, inq.prompt([
                    {
                        type: "input",
                        name: "description",
                        message: chalk.blue("Add text to the description section: "),
                        validate: validate
                    },
                    {
                        type: "input",
                        name: "installation",
                        message: chalk.blue("Add text to the installation section: "),
                        validate: validate
                    },
                    {
                        type: "confirm",
                        name: "contents",
                        message: chalk.blue("Would you like a table of contents?")
                    },
                    {
                        type: "input",
                        name: "useage",
                        message: chalk.blue("Add text to the useage section:"),
                        validate: validate
                    },
                    {
                        type: "input",
                        name: "license",
                        message: chalk.blue("Add a license section:"),
                        validate: validate
                    },
                    {
                        type: "input",
                        name: "contributing",
                        message: chalk.blue("Add text to the contributing section:"),
                        validate: validate
                    }
                ])];
        }
        return [2 /*return*/];
    });
}); };
//-----------------------------------
// get / create badges and  user info
// get user data from input axios call
var getUser = function (username) { return __awaiter(void 0, void 0, void 0, function () {
    var data, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1["default"].get("https://api.github.com/users/" + username)];
            case 1:
                data = (_a.sent()).data;
                // console.log(data);
                // console.log(avatar_url);
                // console.log(email);
                return [2 /*return*/, data];
            case 2:
                err_2 = _a.sent();
                console.log(err_2);
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); };
var createReadme = function (doc) {
    /*
  Description
  Table of Contents
  Installation
  Usage
  License
  Contributing
  Tests*/
    var format = {
        text: ["License", doc.license],
        color: "green",
        template: "flat"
    };
    var svg = bf.create(format);
    var install = "## Installation \n\n";
    var useage = "## Useage \n\n";
    var license = "## License \n\n";
    var contribute = "## Contributors \n\n";
    var test = "## Testing \n\n";
    if (doc.contributing == "") {
        contribute = "";
    }
    else if (doc.test == "") {
        test = "";
    }
    var title = "# " + doc.title + " \n\n";
    var des = "\n\n ## Description \n\n";
    var img = "<img width=\"75\" height = \"75\" align = \"right\" src = \"" + doc.avatar + "\" />\n\n <p align=\"right\"> created by <br> " + doc.username + " <br>Email: " + doc.email + " </p>";
    var desCon = doc.description + "  \n\n";
    var instalcon = doc.installation + " \n\n";
    var useCon = doc.usage + " \n\n";
    var licenseCon = doc.license + " \n\n";
    var contribCon = doc.contributing + " \n\n";
    var testcon = doc.test + " \n\n";
    var contents = "## Table of Contents \n\n\n* [Installation](#installation)\n* [Usage](#usage)\n* [Credits](#credits)\n* [License](#license) \n\n";
    console.log(typeof doc.contents);
    if (doc.contents == true) {
        var str = title +
            svg +
            img +
            des +
            desCon +
            contents +
            install +
            instalcon +
            useage +
            useCon +
            license +
            licenseCon +
            contribute +
            contribCon +
            test +
            testcon;
        return str;
    }
    else {
        var str = title +
            svg +
            img +
            des +
            desCon +
            install +
            instalcon +
            useage +
            useCon +
            license +
            licenseCon +
            contribute +
            contribCon +
            test +
            testcon;
        return str;
    }
};
function writeToReadMe(data) {
    return __awaiter(this, void 0, void 0, function () {
        var err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fs_1.promises.writeFile("TESTME.md", data, "utf8")];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_3 = _a.sent();
                    console.log(chalk.red("There was an error while trying to create the readme!"));
                    console.log(err_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
var createObject = function (docContent, title, testing, contributing, avatar_url, username, email) { return __awaiter(void 0, void 0, void 0, function () {
    var senario1, senario2, senario3, doc, doc, doc, doc;
    return __generator(this, function (_a) {
        senario1 = testing == true && contributing == true;
        senario2 = testing == false && contributing == false;
        senario3 = testing == true && contributing == false;
        if (senario1) {
            doc = new Readme(title, docContent.description, docContent.installation, docContent.useage, docContent.license, docContent.contributing, docContent.testing, avatar_url, email, username, docContent.contents);
            return [2 /*return*/, doc];
        }
        else if (senario2) {
            doc = new Readme(title, docContent.description, docContent.installation, docContent.useage, docContent.license, "", "", avatar_url, email, username, docContent.contents);
            return [2 /*return*/, doc];
        }
        else if (senario3) {
            doc = new Readme(title, docContent.description, docContent.installation, docContent.useage, docContent.license, "", docContent.testing, avatar_url, email, username, docContent.contents);
            return [2 /*return*/, doc];
        }
        else {
            doc = new Readme(title, docContent.description, docContent.installation, docContent.useage, docContent.license, docContent.contributing, "", avatar_url, email, username, docContent.contents);
            return [2 /*return*/, doc];
        }
        return [2 /*return*/];
    });
}); };
function generate() {
    return __awaiter(this, void 0, void 0, function () {
        var response, title, username, res, avatar_url, email, redoEmail, addsections, testing, contributing, docContent, doc, str, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 10]);
                    return [4 /*yield*/, startingQuestions()];
                case 1:
                    response = _a.sent();
                    console.log(response);
                    title = response.title, username = response.username;
                    return [4 /*yield*/, getUser(username)];
                case 2:
                    res = _a.sent();
                    avatar_url = res.avatar_url, email = res.email;
                    if (!(email == undefined || email === null)) return [3 /*break*/, 4];
                    return [4 /*yield*/, inq.prompt([
                            {
                                type: "input",
                                name: "redoEmail",
                                message: chalk.blue("Looks like email was either not public or Wwas not defined on github. Please Enter the email: "),
                                validate: checkInput
                            }
                        ])];
                case 3:
                    redoEmail = (_a.sent()).redoEmail;
                    email = redoEmail;
                    _a.label = 4;
                case 4: return [4 /*yield*/, secondaryQuestoins()];
                case 5:
                    addsections = _a.sent();
                    testing = addsections.testing, contributing = addsections.contributing;
                    return [4 /*yield*/, fromatingQuestoins(testing, contributing)];
                case 6:
                    docContent = _a.sent();
                    return [4 /*yield*/, createObject(docContent, title, testing, contributing, avatar_url, username, email)];
                case 7:
                    doc = _a.sent();
                    console.log(doc);
                    return [4 /*yield*/, createReadme(doc)];
                case 8:
                    str = _a.sent();
                    writeToReadMe(str);
                    return [3 /*break*/, 10];
                case 9:
                    err_4 = _a.sent();
                    console.log(err_4);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
generate();
