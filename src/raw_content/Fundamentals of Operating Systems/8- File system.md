# 8. File system


## **File Metadata, Permissions, and Attributes**
Not only is it expected that files will hold important data, but it is also assumed that a certain amount of metadata is kept to manage these files. The file control block holds all of this metadata for the file, including file permissions, owners, sizes, and create, modified, and access times.
Alongside this bookkeeping metadata, files can also have attributes that indicate special behavior. While this differs on the operating system, common attributes include:
* Hidden: Cannot be viewed by default in file managers.
* Immutable: Cannot be modified or deleted.
* Compressed: The file is in a compressed form to save space.

## **File Permissions Overview**
In <u>[Unix](https://www.codecademy.com/resources/docs/general/unix)</u> operating systems, the permissions for a file are represented using a line of 10 characters. The first character can either be - for a file or d for a directory. The other 9 characters are separated into three equal parts called triads.
The first triad containing the first three characters contains the permissions for the owner, the second triad contains the permissions for the group, and the third triad contains the permissions for any other user outside of this.
Each of these three characters within a triad are flags indicating a permission. r means that the file is readable, w means that the file is writable, and x means that the file is executable.
* For apple, -rw------- means that the file is readable and writable for only the owner.
* For banana, -rw-rw-rw- means that the file is readable and writable for all users on the system.
* For cranberry, -rwxrwxrwx means that the file is readable, writable, and executable for all users on the system.
* For pear, -rw-r--r-- means that the file is readable and writable for the owners, but only readable for everybody else.
* For raspberry, -r--r--r-- means that the file is read only.

## **Hardware Representation of Data**
Within a hard disk drive is a spinning platter with a thin magnetic coating. A pointy head that looks like a thin fountain pen moves over this platter to etch data into the platter by adjusting the direction of the magnetic field at an incredibly precise location.
The smallest chunk of this physical storage is called a sector. It is the smallest unit of storage for the physical drive and its size is determined by a balance between excessive metadata and wasting space.
Smaller sectors require more information to <u>[index](https://www.codecademy.com/resources/docs/general/database/index)</u> the entire drive, like a librarian trying to organize millions of small pamphlets. This ruins performance for finding files as well as creates substantial overhead for documenting the location and content of each sector.
However, larger sector sizes also have drawbacks. For example, if saving a file that has a size of 512 bytes and the sector size is 4096 bytes, the entire sector is written and used, effectively wasting 3584 bytes of space.

## **The Layers of a Filesystem**
Building upon this system of sectors and blocks, the rest of the filesystem is also implemented as a collection of abstract layers.
The entirety of the most common layers are:
**Application Programs** - The day to day programs that are run by the user, like web browsers and text editors.
**Logical File System** - The system that manages the file control blocks containing the metadata of files such as file permissions, owners, sizes, and access times. Simplifies the access to files for applications regardless of how the underlying filesystem or hardware organizes them.
**File-Organization Module** - The component responsible for organizing the software blocks of the filesystem. Simplifies hardware differences between storage devices for the logical file system.
**Basic File System** - Communication layer between software block layout and hardware sector layout. Schedules IO requests and manages resource blocks for file-organization module.
**IO Control** - The low-level software drivers that can communicate with the storage device’s controller. Understands how to manipulate the physical device to read and write data.
**Devices** - The mechanisms of the physical storage devices. For example, the motors and controls that do the physical act of storing data within the medium, be it changing the magnetic state of spinning disks or altering the placement of electrons in flash storage.

## **File Operations**
A file can be manipulated in a variety of ways.
* New empty files are commonly created using the touch command.
* The contents of a directory can be listed using the ls command. (Be sure to type a lowercase “L” as in “list” and not the number 1.)
* A <u>[string](https://www.codecademy.com/resources/docs/general/data-types/string)</u> of text can be output to the <u>[terminal](https://www.codecademy.com/resources/docs/general/terminal)</u> using the echo command. This is useful in coordination with the > operator that redirects the text output to a file.
* A file can be output and read using the cat command.
* A file can be deleted using the rm command.

## **Directory Operations**
* New empty directories can be created using the mkdir command. This can also create directories within existing directories, called sub-directories.
* Again, the contents of a directory can be listed using the ls command.
* A directory can be deleted using the rm command with the -r recursive flag to also delete any files it may contain.










































