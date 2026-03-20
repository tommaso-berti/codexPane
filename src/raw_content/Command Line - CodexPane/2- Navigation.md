# 2. Navigation


Clear terminal

```
$ clear

```


Current directory’s files and directories:

```
$ ls

```

Result of ls -l

```
$ ls -l
drwxr-xr-x 5  cc  eng  4096 Jun 24 16:51  action
drwxr-xr-x 4  cc  eng  4096 Jun 24 16:51  comedy
drwxr-xr-x 6  cc  eng  4096 Jun 24 16:51  drama
-rw-r--r-- 1  cc  eng     0 Jun 24 16:51  genres.txt

```

Chain options
List all contents, including hidden files and directories, in long format, ordered by the date and time they were last modified.

```
ls -alt

```


Options:
* -a - lists all contents, including hidden files and directories (shown starting with a .)
* -l - (a lowercase “L”) lists all contents of a directory in long format, as well as the file permissions. Here’s what each column means:
	* Access rights. These indicate the read, write, and execute permissions on the file or directory allowed to the owner, the group, and all users. You can read more about <u>[file permissions](https://www.linux.com/training-tutorials/understanding-linux-file-permissions/)</u>.
	* Number of hard links. This represents the number of hard links to the file or directory. This number includes the parent directory link (..) and current directory link (.).
	* The username of the file’s owner. Here the username is cc.
	* The name of the group that owns the file. Here the group name is eng.
	* The size of the file in bytes.
	* The date & time that the file was last modified.
	* The name of the file or directory.
* -t - orders files and directories by the time they were last modified.

Output the name of the directory you are currently in, called the *working directory*.

```
$ pwd

```


Change the working directory

```
$ cd directory_name

```


Move up one folder

```
$ cd ..

```

Move up two or more folders

```
$ cd ../..

```


Move across multiple directories with a single command, we can provide cd a relative path to the **memory/** directory as an argument

```
$ cd 2015/jan/memory

```


The last two points can be chained together (move up then move to the directory)

```
$ cd ../2014

```


The mkdir command stands for “make directory”. It takes in a directory name as an argument and then creates a new directory in the current working directory.

```
$ mkdir newDirectory_name

$ mkdir relative_path

```


