Evergreen-updater
===================
A simple and powerful git based auto updater for node.js projects.

How it works
------------
Chuck a git repository somewhere on the web. Server done. Tell Evergreen the local project folder to update and the remote branch you want eg. "production". Client done. This project will fetch and checkout the remote branch and rollback to the previous version if anything fails. Don't worry if the remote branch is completely different and not fast-forward mergable with what's there currently. Since branches are pointers to commits you still get an efficient sync. It's up to you to decide how often the updater is run and what remote branch to checkout. For example, you could put it in a cronjob or run it from your app.

Usage
-------
```js
const Evergreen = require('evergreen-updater');
const url = 'https://github.com/ericbets/evergreen-updater';
const project = './proj';
const success = new Evergreen(url).update(project, 'production');
```

Credits
-------
Thanks [isomorphic-git](https://github.com/isomorphic-git/isomorphic-git), you make the world a better place. 
