# Linux Foundation Certified System Administrator (LFCS)

## Table of Contents
- [Curriculum](#curriculum)
- [Essential Commands](#essential-commands)
- [Operations Deployment](#operations-deployment)
- [Users and Groups](#users-and-groups)
- [Networking](#networking)
- [Storage](#storage)
- [CLI Commands](#cli-commands)
- [Notes](#notes)

## Curriculum
> - Essential Commands **20%**
> - Operations Deployment **25%**
> - Users and Groups **10%**
> - Networking **25%**
> - Storage **20%**

## Essential Commands

> ### Login To Remote & Local GUI-Text Mode Console
- Types:
    - Local Text Mode/ GUI Mode
    - Remote Text Mode via `SSH Client & Daemon`/ GUI Mode via `VNC- virtual network computing`
---
> ### Use System Documentation
- `--help`: Get short help page for a command
- `man`: Get Full help page the documentation of command.
    - Contain sections 1 to 8
    - Contain command in section *1* & *8*
---
> ### Management for File & Directories
- `Absolute path`: A full path from the root of the filesystem, start with `/`.
- `Relative Path`: Starts from the current working directory.
- Commands:
```bash
pwd             # Current working dir
cd /            # Go to root dir
cd -            # Go to previous dir
cd ~            # Go to Home dir
cd ..           # Go to up level of the dir tree 
touch file      # Create a file
mkdir dirname   # Create a directory
cp [src] [dis]  # Copy file to location, add -r for copy dir
mv [src] [dis]  # mv file to location or Rename it
rm name         # remove file, add -r for dir           
```
---
> ### Soft Links & Hard Links
- `Hard Link Process`: link files to Inode 
    - No hard links to dir
    - No hard links between diff filesystem
- `Inode`: 
    - A number that represent a file stored in a system
    - This inode contain metadata of the file 
    - Unique per file
- `Soft Link`: Act as shortcut for files & dirs
    - Soft links between diff filesystem
> ### File Permissions
- Only the owner of a file can change its permissions
```text
  -        rwx        rwx          rwx
[type] [owner_'u'] [group_'g'] [others_'o']
u+[list_of_perm]
u-[list_of_perm]
u=[list_of_perm]
(u=rwx,g=,o=x) == (701)
```
- Commands:
```bash
groups                  # List groups 
chgrp groupname file    # Change group of file
chown ownername file    # Change user of 
chown owner:group file  # Change owner & Group
chmod perms file/dir
```
> ### SUID, SGID, Sticky Bit
- `SUID`: Allow user to run an executable with perm of the executable file Owner
- `SGID`: Allow user to run an executable file/dir with perm of the executable file/dir Group
-  `Sticky Bit`: Restrict file deletion in a dir, Only file owner or group owner or root can delete it
- If special permissions are set but  the corresponding execute permissions are missing, they will not be effective.
    - `rwSrwsr-T` --> only the SGID will be effective & maybe Sticky Bit
```bash
chmod 4xxx file             # set SUID
chmod 2xxx file             # set SGID
chmod 6xxx file             # set SUID & SGID
chmod 1xxx file             # Set Sticky Bit
```

> ### Searching Files
- Commands: find /path/to/search/in/ <options> file

```bash
# Options(name) 
find /usr/share -name '*.jpg'               # search file name end with jpg  case sensitive  
find /usr/share -iname kary.txt             # search file name kary.txt no case sensitive
# Options(size)
find /usr/share -size +10M                  # search size more 10M
# Options(perm)
find -perm 664                              # search with perm exactly 664
find -perm u=rw                             # search with perm exactly u=rw
find -perm -664                             # search with at least perm 664
find -perm /664                             # search with any of perm 664
# Options(mmin)
find /usr/share -mmin 3                     # modified from 3 mins
find /usr/share -mmin -3                    # modified within prev 3 mins
find /usr/share -mmin +3                    # modified more that 3 mins back
# Options(cmin)   
find . -cmin -5                             # Changed within prev 5 mins
# Combining more than one option
find -name kary -size +100k                 # search name kary AND size more 100k
find -name kary -o -size +100k              # search name kary OR size more 100k
find -not -name kary                        # search not name kary 
```

> ### Manipulate File Content
- Display File Content:
    - Normal display: `cat`, `tac`, `tail`, `head` 
    - Sorted & Uniq: `sort`, `uniq`
    - Portion of line: `cut` 
    - File diff: `diff`, `sdiff`  
- Transform File Content:
    - Stream Editor: `sed`
```bash
# Display File Content
cat                         # Display File Content top -> Bottom 
tac                         # Display File Content Bottom -> top
tail -n 30                  # Display tail of File (last 30 lines)
head -n 20                  # Display head of File (first 20 lines)

cut -d ',' -f 2 file        # Display portion of each line, '-d'--> Delimiter, '-f' --> field
sort file | uniq            # Sort content and show uniq values
diff -y file1 file2         # show files diff
sed -i 's/cary/kary/g' file    # replace every match of cary to kary, , 's' --> substitutes 'g' --> Global(all matches), -i --> in place 
less file                   # Display and search file in pages
more file                   # Display file in pages
```
> ### Search File Using Grep
```bash
grep [options] 'search_Pattern' file
# -i Case inessive
# -v Revert 
# -r Recursive for dir
# -w specific batten
# -c count
grep -ir 'password' /dir/           # Search case insensitive of word password in dir and sub dir
```
> ### Analyze Text Using RegEX
- RegEx:
    - `^`: Match text with *start* pattern
    - `$`: Match text with *end* pattern
    - `.`: Match *any* char
    - `\`: *Escape* the next char
    - `*`: *0 or more* char appearance 
    - `+`: *1 or more* char appearance
    - `?`: *0 or 1* char appearance
    - `|`: pattern | pattern, act as OR
    - `{n,m}`,`{x}`: pattern char of min=n & max=m occurrence, or Exact x times
    - `[range]`: [a-z] match a to z
    - `[^]`: Negated Ranges
    - `()`: SubExpressions Group
- Using `egrep` or `-E`: to use RegEx in matching pattern using grep

## Operations Deployment

## Users and Groups

## Networking

## Storage

## CLI Commands
```bash
# Essential Commands
## Notes 
man man                     # see system docs on man using man
sudo mandb                  # Refresh the db of man docs
apropos director            # Searching for commands
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
stat file                   # see details about file
ln file/path file/path      # create a hard link to a file 
ln - s file file/shortcut   # create a soft link to a file    
readlink file               # read the soft link of the file
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

## Lab 
man ssh
apropos hostname
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
find /var/log/ -perm -g=w -not -perm /o=rw 
find /var/ -type d -name pets | tee /home/bob/pets.txt
sudo find /var -type f -perm 0777 -print
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
sed -i 's/enabled/disabled/g' values.conf 
sed -i 's/disabled/enabled/gi' /home/bob/values.conf    # Case In sensitive
sed -i '500,2000s/enabled/disabled/g' values.conf       # In range
sed -i 's~#%$2jh//238720//31223~$2//23872031223~g' /home/bob/data.txt   #use ~ to separate  diff patterns
## Notes