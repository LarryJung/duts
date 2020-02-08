# duts

command line tool that do 'memo control' of a file.

## usage
```
$ duts init [file]
```
[file] is optional. if you don't not specify filename, all files in present directory will be initialized. After initialized, '.dots' directory that have all informations of duts operations was created.

```
$ duts memo <file> <contents>
```
\<file> is mandatory. if you have long text (include space), **must** use quotes.
ex) `duts memo README.md 'hello world'`

```
$ duts log <file>
```
view memo logs.