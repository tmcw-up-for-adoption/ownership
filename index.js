var spawn = require('child_process').spawn;

module.exports.addUsersToPackage = addUsersToPackage;
module.exports.addUsersToPackages = addUsersToPackages;
module.exports.rmUserFromPackages = rmUserFromPackages;

function addUsersToPackages(users, packages, callback) {
    var i = -1;
    addPackage();
    function addPackage() {
        var p = packages[++i];
        console.log('Adding users to ', p);
        if (!p) { return callback(null); }

        addUsersToPackage(users, p, function(err) {
            if (!err) addPackage();
        });
    }
}

function addUsersToPackage(users, name, callback) {
    var i = -1;
    addUser();
    function addUser() {
        var user = users[++i];

        if (!user) {
            process.stdout.write('\n');
            return callback(null);
        }

        spawn('npm', ['owner', 'add', user, name])
            .on('exit', onexit.bind(undefined, user))
            .on('error', onerror.bind(undefined, user));
    }
    function onexit(user, code) {
        if (code === 0) {
            process.stdout.write('✓ ' + user + ' ');
            addUser();
        } else {
            process.stdout.write('err ' +
                code + ': unable to add ' +
                user + ' - are you sure the module ' + name + ' exists and is published?\n');
        }
    }
    function onerror(user, err) {
        process.stdout.write('err: unable to add ' +
            user + '\n');
        console.log(err.message);
    }
}
function rmUserFromPackages(user, names, callback) {
    var i = -1;
    addUser();
    function addUser() {
        var name = names[++i];

        if (!name) {
            process.stdout.write('\n');
            return callback();
        }

        spawn('npm', ['owner', 'rm', user, name])
            .on('exit', onexit.bind(undefined, user, name))
            .on('error', onerror.bind(undefined, user, name));
    }
    function onexit(user, name, code) {
        if (code === 0) {
            process.stdout.write('✓ ' + user + ' removed from ' + name + '\n');
            addUser();
        } else {
            process.stdout.write('err ' +
                code + ': unable to rm ' +
                user + ' - are you sure the module ' + name + ' exists and is published?\n');
        }
    }
    function onerror(user, err) {
        process.stdout.write('err: unable to rm ' +
            user + '\n');
        console.log(err.message);
    }
}