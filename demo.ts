import { promises as fs } from "fs";
import chalk  = require("chalk");

import axios, {
  AxiosRequestConfig,
  AxiosPromise,
  AxiosTransformer
} from "axios";
import inq = require("inquirer");
const { BadgeFactory } = require("gh-badges");
const bf = new BadgeFactory();

//console.table
//group and chack to color command line
//used to store all the usefull read me string formmating will ad methods that foramt each section accrodingly
class Readme {
  title: string;
  description: string;
  installation: string;
  usage: string;
  contents?: boolean;
  license: string;
  contributing: string; //list of user objects. that contain name,avatar url
  test: string;
  avatar: string;
  email: string;
  username: string;
  constructor(
    title: string,
    descripting: string,
    installation: string,
    useage: string,
    license: string,
    contributating: string,
    test: string,
    avatar_url: string,
    email: string,
    username: string,
    contents?: boolean
  ) {
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
}
//-------------------------------------
//   validation section
//-------general validation for number inputs and empty strings all not allowed unless for certain questions--------------------
const checkInput = async input => {
  let matches = input.match(/\d+/g);

  if (input === "" || matches != null) {
    return "Title can not contain numbers nor can it be empty! please enter again: ";
  }
  return true;
};
const validate = input => {
  if (input === "") {
    return "This can not be empty! If you are unsure what totype just put filler text in. Please enter again: ";
  }
  return true;
};

const userExists = async (username): Promise<boolean> => {
  try {
    await axios.get(`https://api.github.com/users/${username}`);
    return true;
  } catch (err) {
    return false;
  }
};

const testUser = async input => {
  if (input !== "" && (await userExists(input)) == true) {
    return true;
  } else {
    return "This user could not be found! please try it again:";
  }
};

//-------------------------------------------
//  question section

//starting questoins
const startingQuestions = (): Promise<any> => {
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
const secondaryQuestoins = (): Promise<any> => {
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

const fromatingQuestoins = async (testing, contributing): Promise<any> => {
  //probably a better way todo this but I wasn't sure how to add contents/testing/contributing to the other inqueirer object
  const senario1 = testing == true && contributing == true;
  const senario2 = testing == false && contributing == false;
  const senario3 = testing == true && contributing == false;
  console.log(
    "Use \\n for new lines! Enter will cause you to go to tthe next section."
  );
  if (senario1) {
    return inq.prompt([
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
        message: chalk.blue( "Add text to the installation section: "),
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
    ]);
  } else if (senario2) {
    return inq.prompt([
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
    ]);
  } else if (senario3) {
    return inq.prompt([
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
    ]);
  } else {
    return inq.prompt([
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
    ]);
  }
};

//-----------------------------------
// get / create badges and  user info
// get user data from input axios call
const getUser = async (username): Promise<any> => {
  try {
    let { data } = await axios.get(`https://api.github.com/users/${username}`);
    // console.log(data);
    // console.log(avatar_url);
    // console.log(email);
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
const createReadme = (doc: Readme) => {
  /*  
Description
Table of Contents
Installation
Usage
License
Contributing
Tests*/
  const format = {
    text: ["License", doc.license],
    color: "green",
    template: "flat"
  };
  const svg = bf.create(format);
  const install = "## Installation \n\n";
  const useage = "## Useage \n\n";
  const license = "## License \n\n";

  let contribute = "## Contributors \n\n";
  let test = "## Testing \n\n";
  if (doc.contributing == "") {
    contribute = "";
  } else if (doc.test == "") {
    test = "";
  }

  let title = `# ${doc.title} \n\n`;
  let des = "\n\n ## Description \n\n";
  let img = `<img width="75" height = "75" align = "right" src = "${doc.avatar}" />\n\n <p align="right"> created by <br> ${doc.username} <br>Email: ${doc.email} </p>`;
  let desCon = `${doc.description}  \n\n`;
  let instalcon = `${doc.installation} \n\n`;
  let useCon = `${doc.usage} \n\n`;
  let licenseCon = `${doc.license} \n\n`;
  let contribCon = `${doc.contributing} \n\n`;
  let testcon = `${doc.test} \n\n`;
  let contents = `## Table of Contents \n\n
* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license) \n\n`;
  console.log(typeof doc.contents);
  if (doc.contents == true) {
    let str =
      title +
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
  } else {
    let str =
      title +
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
async function writeToReadMe(data) {
  try {
    await fs.writeFile("TESTME.md", data, "utf8");
  } catch (err) {
    console.log(chalk.red(`There was an error while trying to create the readme!`));
    console.log(err);
  }
}
const createObject = async (
  docContent,
  title,
  testing,
  contributing,
  avatar_url,
  username,
  email
) => {
  /*  
    title: string,
    descripting: string,
    installation: string,
    useage: string,
    license: string,
    contributating: string,
    test: string,
    avatar_url: string,
    email: string,
    username: string,
    contents?: string just for practice in future will make this implementation better  for it to make sense!
      */

  const senario1 = testing == true && contributing == true;
  const senario2 = testing == false && contributing == false;
  const senario3 = testing == true && contributing == false;

  if (senario1) {
    let doc = new Readme(
      title,
      docContent.description,
      docContent.installation,
      docContent.useage,
      docContent.license,
      docContent.contributing,
      docContent.testing,
      avatar_url,
      email,
      username,
      docContent.contents
    );
    return doc;
  } else if (senario2) {
    const doc = new Readme(
      title,
      docContent.description,
      docContent.installation,
      docContent.useage,
      docContent.license,
      "",
      "",
      avatar_url,
      email,
      username,
      docContent.contents
    );
    return doc;
  } else if (senario3) {
    const doc = new Readme(
      title,
      docContent.description,
      docContent.installation,
      docContent.useage,
      docContent.license,
      "",
      docContent.testing,
      avatar_url,
      email,
      username,
      docContent.contents
    );
    return doc;
  } else {
    const doc = new Readme(
      title,
      docContent.description,
      docContent.installation,
      docContent.useage,
      docContent.license,
      docContent.contributing,
      "",
      avatar_url,
      email,
      username,
      docContent.contents
    );
    return doc;
  }
};
async function generate() {
  //let readme = new Readme();
  try {
    const response = await startingQuestions();
    console.log(response);
    const { title, username } = response;
    //  console.log(
    //    await axios.get(`https://api.github.com/${username}/public_emails`)
    //  );
    const res = await getUser(username);
    let { avatar_url, email } = res;
    if (email == undefined || email === null) {
      let { redoEmail } = await inq.prompt([
        {
          type: "input",
          name: "redoEmail",
          message:
          chalk.blue("Looks like email was either not public or Wwas not defined on github. Please Enter the email: "),
          validate: checkInput
        }
      ]);
      email = redoEmail;
    }
    //------------------------------------
    // ask if they want testing contributors or table of contents
    const addsections = await secondaryQuestoins();
    const { testing, contributing } = addsections;
    const docContent = await fromatingQuestoins(testing, contributing);
    let doc = await createObject(
      docContent,
      title,
      testing,
      contributing,
      avatar_url,
      username,
      email
    );
    console.log(doc);
    const str = await createReadme(doc);
    writeToReadMe(str);
    // console.log(data.avatar_url);
  } catch (err) {
    console.log(err);
  }
}
generate();
