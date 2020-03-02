const fs = require("fs");
const axios = require("axios");
const inq = require("inquirer");

async function createReadMe() {
  const gitres = null;
  try {
    const result = await inq.prompt([
      {
        type: "input",
        name: "username",
        message: "Enter your github user name:",
        validate: async function(input) {
          const queryUrl = `https://api.github.com/users/${input}/repos?per_page=100`;
          try {
            gitres = await axios.get(queryUrl);
            return true;
          } catch {
            return false;
          }
        }
      },
      {
        type: "input",
        name: "",
        message: "What is your age?",
        when: function(responses) {
          return responses.getAge;
        },
        validate: function(input) {
          return parseInt(input) ? true : "Invalid entry!";
        }
      }
    ]);

    const { data } = await axios.get(
      `https://www.omdbapi.com/?t=${movie}&apikey=trilogy`
    );

    console.log(data);
  } catch (err) {
    console.log(err);
  }
}
createReadMe();
