var Steps = require('screener-runner/src/steps');

module.exports = {
    // full repository name for your project:
    projectRepo: 'gobs/inventorymanagement',
  
    // this example assumes Environment Variables listed below exist on your system:
    apiKey: 'ba8c42e1-2fe7-49d8-b7aa-3b045c224e2f',
  
    // array of UI states to capture visual snapshots of.
    // each state consists of a url and a name.
    states: [
      {
        url: 'http://localhost:4200',
        name: 'home',
        steps: new Steps()
            .click('body > app-root > app-header > mat-toolbar > div > button')
            .end()
      }
    ],

    
  };