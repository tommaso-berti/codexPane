# 4. Advanced commands


## Log
git log --oneline shows the list of commits in one line format.

git log -S "keyword" displays a list of commits where the number of occurrences of the keyword changes within at least one file via addition, deletion, or modification. In the screenshot below, we use git log -S "Add" to find any commits where the number of occurrences of “Add” within a file changes.

git log --oneline --graph - --graph Displays a visual representation of how the branches and commits were created in order to help you make sense of your repository history. When used alone, the description can be very lengthy, so you can combine the command with --oneline in order to shorten the description.

## Commit
Git’s --amend flag is extremely useful when updating a commit, it allows you to correct mistakes and edit commits easily instead of creating a completely new one
It’s important to note that although it seems like --amend is simply updating the commit, what Git actually does is replace the whole previous commit. For this reason, when you execute the command git commit --amend, your terminal editor asks you to update your commit message. However, if you want to keep the same commit message, you can simply add the flag --no-edit:

## Alias
If you have a set of commands that you use regularly and want to save some time from typing them, you can easily set up an alias for each command using Git config.
Below are a couple of examples:

```
$ git config --global alias.co "checkout"
$ git config --global alias.br "branch"
$ git config --global alias.glop "log --pretty=format:"%h %s" --graph"

```


Once the aliases are configured, next time you want to check out to another branch you could type the command:

```
$ git co example_branch

```

Instead of

```
$ git checkout example_branch

```

