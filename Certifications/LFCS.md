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


```

## Notes