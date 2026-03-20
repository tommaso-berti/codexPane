# 4. Redirection


Through *redirection* you can direct the input and output of a command to and from other files and programs, and chain commands together in a pipeline. Let’s try it out.

```
$ echo "Hello"
Hello

```


The echo command accepts the string “Hello” as *standard input*, and echoes the string “Hello” back to the terminal as *standard output*.
Let’s learn more about standard input, standard output, and standard error:
* *standard input*, abbreviated as stdin, is information inputted into the terminal through the keyboard or input device.
* *standard output*, abbreviated as stdout, is the information outputted after a process is run.
* *standard error*, abbreviated as stderr, is an error message outputted by a failed process.

The > command redirects the standard output to a file. Here, "Hello" is entered as the standard input, and is then redirected to the file **hello.txt** by > . > overwrites all content on the destination file

```
$ echo "Hello" > hello.txt

```

The >> takes the standard output of the command on the left and *appends* (adds) it to the file on the right.

```
$ cat forests.txt >> hello.txt

```


< takes the standard input from the file on the right and inputs it into the command on the left. Here, **deserts.txt** is the standard input for the cat command. The standard output appears in the terminal.

```
$ cat < deserts.txt

```

That in this case is the same of

```
$ cat deserts.txt

```


| is a “pipe.” The | takes the standard output of the command on the left, and *pipes* it as standard input to the command on the right. You can think of this as “command to command” redirection.
To count the words in **volcanoes.txt** using the word count command wc:

```
$ cat volcanoes.txt | wc  

```

Above, the output of cat volcanoes.txt becomes the standard input of wc. In turn, the wc command outputs the number of lines, words, and characters in **volcanoes.txt**, respectively.

```
$ cat volcanoes.txt | wc | cat > count.txt 

```

Multiple |s can be chained together. Above the standard output of cat volcanoes.txt is “piped” to the wc command. The standard output of wc is then “piped” to cat. Finally, the standard output of cat is redirected to count.txt.

sort takes the standard input and orders it alphabetically for the standard output

```
$ sort continents.txt 

```

Example. Here, the command takes the standard output from cat glaciers.txt and “pipes” it to sort. The standard output of sort is redirected to a new file named **sorted-glaciers.txt**.

```
$ cat glaciers.txt | sort > sorted-glaciers.txt 

```


uniq stands for “unique.” It filters out adjacent, duplicate lines in a file.

```
$ sort deserts.txt | uniq

```

A more effective way to use uniq is to call sort to alphabetize a file, and “pipe” the standard output to uniq. By piping sort deserts.txt to uniq, all duplicate lines are alphabetized (and thereby made adjacent) and filtered out.

grep stands for “global regular expression print.” It searches files for lines that match a pattern and then returns the results. It is also case sensitive. Above, grep searched for anything that matched “America” in **continents.txt**.
grep -i enables the command to be case insensitive. You can also use regular expressions to search for patterns in files

```
$ grep -i America continents.txt

```


grep -R searches all files in a directory and outputs filenames and lines containing matched results. -R stands for “recursive”. Above, grep -R searched the **/home/ccuser/workspace/geography** directory for the string “Arctic” and outputted filenames and lines with matching results.

```
$ grep -R Arctic /home/ccuser/workspace/geography

/home/ccuser/workspace/geography/deserts.txt:Arctic Desert
/home/ccuser/workspace/geography/oceans.txt:Arctic Ocean

```


grep -Rl searches all files in a directory and outputs only filenames with matched results (so no lines).
l, which is a lowercase L (not a capital i, not the number 1), stands for “files with matches.” Here grep -Rl searched the **/home/ccuser/workspace/geography** directory for the string “Arctic” and outputs filenames with matched results.

```
$ grep -Rl Arctic /home/ccuser/workspace/geography

/home/ccuser/workspace/geography/deserts.txt
/home/ccuser/workspace/geography/oceans.txt

```



```
sed 's/snow/rain/' forests.txt 

```

sed stands for “stream editor.” It accepts standard input and modifies it based on an *expression*, before displaying it as output data. It is similar to “find and replace.”
* s: stands for “substitution.” It is *always* used when using sed for substitution.
* snow: the search string, or the text to find.
* rain: the replacement string, or the text to add in place.


```
sed 's/snow/rain/g' forests.txt 

```

The above command uses the g expression, meaning “global.” Here sed searches **forests.txt** for the word “snow” and replaces it with “rain” *globally*. This means *all* instances of “snow” on a line will be turned to “rain.”

sed as we’ve used it will only rewrite the command line output and the actual file won’t be changed. In order to rewrite the actual file, we need to use -i at the beginning of the command:

```
sed -i 's/snow/rain/g' forests.txt

```

The above command will rewrite **forests.txt** and replace *all* instances (since we’re also using g) of “snow” with “rain”.