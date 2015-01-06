# ownership

This is a **module template**
the [`npm owner`](https://docs.npmjs.com/cli/owner) command to
make management of open source projects with many contributors easier,
by keeping specific lists of **users with access** and optionally **packages
they should have ownership of**.

This doesn't bend any laws you need to be an owner of the package yourself
in order to add other owners, just like you would using `npm owner`.

# FORK ME

This is a **template**, not a finished project. It is meant for you to
copy & rename. For instance, at [Mapbox](https://www.mapbox.com/), we
have a copy called `mapbox-owners` that adds all employees to a package.
It's called `mapbox-owners` and has a hardcoded list of people in the package:
updating the package updates the list.

Do the same: fork this, rename it in `package.json` to something else,
change the names of the binaries, and change the [example-users.json](example-users.json)
and [example-packages.json](example-packages.json) configuration files to suit
your fancy.

# install

    npm install -g ownership

# usage

Provides two utilities:

## ownership

`ownership`: takes one argument, the name of the package,
and adds all users to that package as owners. For instance:

    ownership express

Would add all users in `example-users.json` as owners to the
`express` packages.

## ownership-all

`ownership-all` doesn't take any arguments: it adds all users in
`example-users.json` to all packages in `example-packages.json`.
