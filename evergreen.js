const fs = require('fs-extra');
const os = require('os');
const path = require('path');
const git = require("isomorphic-git");
git.plugins.set('fs', fs);

class Evergreen {
	constructor() {
	}

	async update(url, dir, branch) {
		if (!fs.existsSync(dir + "/.git")) {
			try {
				await git.clone({dir: dir, url: url, ref: branch, singleBranch: true, depth: 1});
				await git.config({ dir: dir, path: 'evergreen.count', value: 0});
				await git.branch({dir: dir, ref: "evergreen-" + branch + "-" + 0, checkout: true});
			}
			catch(error) {
				console.error(error);
				fs.removeSync(dir + "/.git");
				return false;
			}
		}
		else {
			let count;
			try {
				count = await git.config({dir:dir, path: 'evergreen.count'});
				count = Number.parseInt(count);
				await git.fetch({dir: dir,url:url, ref: branch, singleBranch: true, remote: 'origin', tags: false});
				count = count+1;
				await git.branch({dir: dir, ref: "evergreen-" + branch + "-" + count, checkout: true});
				await git.config({ dir: dir, path: 'evergreen.count', value: count});
			}
			catch(error) {
				console.error(error);
				console.error("Error, rolling back..");
				let value = await git.config({dir:dir, path: 'evergreen.count'});
				await git.checkout({dir, ref: "evergreen-" + branch + "-" + count-1});
				return false;
			}
			
		}
		return true;
			
	}
}
module.exports = Evergreen;
