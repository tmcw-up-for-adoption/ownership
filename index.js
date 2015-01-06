var spawn = require('child_process').spawn;

module.exports.addUsersToPackage = addUsersToPackage;
module.exports.addUsersToPackages = addUsersToPackages;

function addUsersToPackages(users, packages, callback) {
    addPackage();
    function addPackage() {
        var p = packages.pop();
        if (!p) { return callback(null); }

        addUsersToPackage(users, p, function(err) {
            if (!err) addPackage();
        });
    }
}

function addUsersToPackage(users, name, callback) {
    addUser();
    function addUser() {
        var user = users.pop();

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
