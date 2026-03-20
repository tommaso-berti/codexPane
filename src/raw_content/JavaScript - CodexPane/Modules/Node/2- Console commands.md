# 2. Console commands


## process.argv

Retrive all commands launched from console.

```
$ node celsius-to-fahrenheit.js 100

```

process.argv retrieve

```
['node', 'celsius-to-fahrenheit.js', '100']

```

To access a single “piece” of command separated by a comma

```
process.argv[2] -> returns 100

```

