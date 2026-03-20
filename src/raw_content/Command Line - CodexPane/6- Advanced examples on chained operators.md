# 6. Advanced examples on chained operators


Some of the files in our project which end with the suffix, **.txt**, have no content in them. List the files, across all the continent directories, that end with **.txt** that have no content and save the listing in a file, **empty_files.txt**, in the **todo/** directory.

```
wc -l */*.txt | grep 0 > todo/empty_files.txt

```

l’opzione -l del comando wc server per contare il numero di righe 