function runSearch() {
    inquirer
      .prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
          "Find product by name",
          "Find product by department",
          "Find data within a specific range",
          "Search for a specific song",
          "Find artists with a top song and top album in the same year"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "Find product by name":
          productSearch();
          break;
  
        case "Find product by department":
          departmentSearch();
          break;
  
        case "Find product by ":
          rangeSearch();
          break;
  
        case "Search for a specific song":
          songSearch();
          break;
  
        case "Find artists with a top song and top album in the same year":
          songAndAlbumSearch();
          break;
        }
      });
  }