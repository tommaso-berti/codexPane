# 3. File manipulation


The touch command creates a new file inside the working directory

```
$ touch keyboard.txt

```


The cat command outputs in the terminal the contents of a specified file

```
cat hello_cli.txt

```


Create a new file named **hello_cli.txt** and add Hello Command Line to that file

```
echo "Hello Command Line" >> hello_cli.txt

```


Make a copy of a file

```
cp source.txt destination.bak

```

NOTE: The “**.bak**“ file extension is commonly used to notate a file as a backup of a file with the same name.
If we wanted to rename the file as well, we would include the name in the path of the second argument

```
cp the-office.txt slapstick/the-office-us.txt
//or
cp biopic/cleopatra.txt historical/cleopatra.txtx

```

Copy multiple file to a directory

```
cp file1.txt folder/file2.txt my_directory

```

For example, here we use cp to copy all files in the current working directory into another directory.

```
cp * my_directory

```

To move just the ‘.txt’ files you can use a wild card with a suffix:

```
cp *.txt my_directory

```

In addition to suffixes, prefix text can be used with wildcards. Using w*.txt selects all files in the working directory starting with “w” (prefix) and ending with “.txt” (suffix), and copies them to **my_directory/**.

```
cp w*.txt my_directory

```


mv move files from a directory to another (very similar to cp)

```
mv my_file.txt my_directory/

```

. (dot) is the current directory

```
mv my_file.txt .

```


The rm command deletes files and directories.
Without -r it deletes only files

```
rm unwanted_file.txt

```

The -r (recursive) option is used to delete a directory and all of its child directories. 

```
rm -r unwanted_directory

```

