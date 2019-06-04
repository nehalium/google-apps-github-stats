var Github = (function() {
  // Public members  
  var github = {};
  github.getRepos = getRepos;
  return github;
  
  // Private members
  function getRepos() {
    var items = [];
    var count = 0;
    
    var cursor = '';
    var iteration = 0;
    var result = '';
    var repos = 0;
    
    while(true) {
      iteration++;
      result = executeQuery(getReposQuery(100, cursor));
      repos = result.data.organization.repositories.edges;
      
      if (repos.length == 0) {
        break;
      }

      for(var i=0; i<repos.length; i++) {
        count++;
        cursor = repos[i].cursor;
        items.push(buildReposTuple(repos[i]));
      }
    }
    
    return {
      headers: ['Name', 'Description'],
      items: items,
      count: count
    };
  }

  // Returns an object with the fields in item we are interested in
  function buildReposTuple(item) {
    return {
      name: item.node.name,
      description: item.node.description,
    };
  }
  
  // Calls the API and returns the result
  function executeQuery(query) {
    var options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + Config['github.token']
      }
    }; 
    options.payload = query;
    var response = UrlFetchApp.fetch(Config['github.url'], options);
    var json = response.getContentText();
    return JSON.parse(json);
  }
  
  // Constructs the graphql query
  function getReposQuery(numItems, cursor) {
    var template = getReposBaseQuery();
    var first = 'first: ' + numItems;
    var after = (cursor !== '') ? ', after: "' + cursor + '"' : '';
    template = template.replace('first: 100', first + after);
    template = template.replace('$LOGIN$', Config['github.login']);
    return JSON.stringify({ query: template });
  }
  
  // Returns the base graphql query for Github
  function getReposBaseQuery() {
    return "{\
      organization(login: $LOGIN$) {\
        repositories(first: 100, orderBy: {field: NAME, direction: ASC}) {\
          edges {\
            cursor\
              node {\
                name\
                description\
              }\
            }\
          }\
        }\
      }";
  }
})()