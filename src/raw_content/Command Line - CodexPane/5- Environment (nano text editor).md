# 5. Environment (nano text editor)



```
$ nano hello.txt

```

*nano* is a command line text editor. It works the same way as a desktop text editor like TextEdit or Notepad, except that it is accessible from the command line and only accepts keyboard input.
* The command nano hello.txt opens a new text file named **hello.txt** in the nano text editor.
* Hello, I am nano is a text string entered in nano at the line indicated by the cursor.
* The menu of keyboard commands at the bottom of the window allow us to save changes to **hello.txt** and exit nano.

## Bash
A bash profile is a file used to store environment settings for your terminal. On most computer systems, the file is in the home directory and is accessible by the name **.bash_profile**.
When you edit the bash profile, you can add commands to execute every time a new terminal session is started.
To activate the changes made in **.bash_profile** for the current session, use:

```
source .bash_profile

```

Absolute path of .bash_profile

```
~/.bash_profile

```

If not existent, a new one has to be created

## Alias
The alias command allows you to create keyboard shortcuts, or aliases, for commonly used commands.
Here, alias pd="pwd" creates the alias pd for the pwd command, which is then saved in the bash profile. Please note, no spaces are allowed before and after the = symbol

```
alias pd="pwd"

```

The pd alias will be available each time we open a new terminal session, and the output of pd will be the same as the pwd command.
source .bash_profile will make the alias pd available in the current session.

## Environment variables 
### export
*Environment variables* are variables that can be used across commands and programs and hold information about the environment.
Example

```
export USER="Jane Doe"

```

* The line USER="Jane Doe" sets the environment variable USER to a name “Jane Doe”. Usually the USER variable is set to the name of the computer’s owner.
* The line export makes the variable available to all child sessions initiated from the session you are in. This is a way to make the variable persist across programs.
* At the command line, the command echo $USER returns the value of the variable. Note that $ is always used when returning a variable’s value. Here, the command echo $USER returns the name set for the variable.

### PS1
PS1 is an environment variable that defines the makeup and style of the command prompt.  A space must be used after the desired symbol

```
export PS1=">> "

```

* export PS1=">> " sets the command prompt variable and exports the variable. Here we change the default command prompt from $ to >> .
* After using the source command, the command line displays the new command prompt.
When you display a new line it will start with >> instead of $

```
>> 

```


### HOME

```
$ echo $HOME 

```

The HOME variable is an environment variable that displays the path of the home directory ~. You can specify and change the HOME variable if needed, but in most cases this is not necessary.

### PATH
PATH is an environment variable that stores a list of directories separated by a colon.

```
$ echo $PATH 

```

Returns

```
/home/ccuser/.gem/ruby/2.0.0/bin:/usr/local/sbin:
  /usr/local/bin:/usr/bin:/usr/sbin:/sbin:/bin

```

echo $PATH lists the following directories, separated by :
* /home/ccuser/.gem/ruby/2.0.0/bin
* /usr/local/sbin
* /usr/local/bin
* /usr/bin
* /usr/sbin
* /sbin
* /bin
Each directory contains scripts for the command line to execute. The PATH variable simply lists which directories contain scripts.
For example, many commands we’ve learned are scripts stored in the **/bin** directory.

```
/bin/pwd

```

This is the script that is executed when you type the pwd command.

```
/bin/ls

```

This is the script that is executed when you type the ls command.
In fact

```
$ /bin/pwd
/home/ccuser/workspace/path-variable

```

Returns the same of

```
$ pwd
/home/ccuser/workspace/path-variable

```


### Env
The env command stands for “environment,” and returns a list of the <u>[environment variables](https://www.codecademy.com/resources/docs/command-line/environment-variables)</u> for the current user.
The env command returns a number of variables, including PATH, PWD, PS1, and HOME. To select the value of a particular environment variable, let’s say PATH, you can use the following command:

```
env | grep PATH

```

