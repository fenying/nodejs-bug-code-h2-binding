# NodeJS H2 Bug About Binding TLS connection

Run [`index.js`](./index.js).

And you will see only `TLS ok` in Node v12.18.x, but `H2 ok` in `v8.17.0`, `v10.22.0`, `v14.8.0`

```sh
$ nvm use v10.22.0
Now using node v10.22.0 (npm v6.14.6)
$ node index.js
TLS ok
H2 ok
^C
$ nvm use v8.17.0
Now using node v8.17.0 (npm v6.13.4)
$ node index.js
TLS ok
H2 ok
^C
$ nvm use v14.8.0
Now using node v14.8.0 (npm v6.14.7)
$ node index.js
TLS ok
H2 ok
^C
$ nvm use v12.18.3
Now using node v12.18.3 (npm v6.14.6)
$ node index.js
TLS ok
^C
```
