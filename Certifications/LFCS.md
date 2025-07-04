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

## ***Essential Commands***

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
---

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
---

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
---

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
---

> ### Search File Using Grep
```bash
grep [options] 'search_Pattern' file
# -i Case inessive
# -v Revert 
# -n Show line numbers
# -r Recursive for dir
# -w specific batten
# -c count
# -q option tells grep to run quietly (or silently).
# -E use RegEx
# --color Highlight matching text
grep -ir 'password' /dir/           # Search case insensitive of word password in dir and sub dir
```
---

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
---

> ### Archive, Back Up, Compress
- When we backup our data we archive it into a file then compress this file.
#### Archive
- `Command:` **.tar**: 
    - `-tf`: --list --files
    - `-cf`: --create --file
    - `-rf`: --append --file
    - `-xf`: --extract --file
    - `-C`: --directory
    - `-z`: --gzip
    - `-j`: --bzip
    - `-J`: --xz
    - `-a`: --autocomplete
```bash
tar -tf archive.tar
tar -cf archive_name.tar files/dir
tar -rf archive_name.tar files/dir
tar -xf archive_name.tar
tar -xf archive_name.tar -C desired_path

tar -czf archive.tar.gz files
tar -cjf archive.tar.bz2 files
tar -cJf archive.tar.xz files

tar -caf archive.tar file_or_directory

 ```

#### Compress
- Tools that compress single file: `gzip`, `bzip`, `xz`
- `Command:` **.gz**, **.bz2**, **.xz** : 
    - `-k`: --keep
    - `-l`: --list
- Tools that compress more that one file: `zip` 
- `Command:` **.zip** : 
    - `-r`: recursive for folders
```bash
# gzip tool
gzip file
gunzip file.gz
# bzip tool
bzip2 file
bunzip file.gz
# xz tool
xz file
unxz file.gz
# zip
zip archive file
zip -r archive /dir/
```

#### Backup
```bash
# Backup Dir to another machine using ssh daemon or to same machine
rsync -a dirORfile/ backupsDIR/
rsync -a dirORfile/ kary:ip.to.ssh.machine:path/to/location
# Disk Image
sudo dd if=/input/disk of=/output/image.raw bs=1M --status
```
---

> ### Input/Output Redirection
- `<`: input redirect (stdin)
- `<<EOF text EOF`: End of file signal
- `bc <<<1+2+3`: Here String
- `>`, `1>`: redirect output overwrite the file (stdout)
- `>>`, `1>>`: output append to file (stdout)
- `2>`: output direct error of the output and overwrite (stderr)
- `2>>`: output direct error of the output and append (stderr)
- `1> output.txt 2>&1`, `&> output.txt`: direct output to file and direct error to the output too
- `|`: Piping the output of command  to another command
```bash
cat < file.txt 

sort file > output
sort file 1> file2 2> error
sort file &> output

cat file.txt | grep "hello"
cat <<EOF
line1
line1
EOF

#!/bin/bash
cat <<EOF > myfile.txt
Line 1: Hello
Line 2: This is a test
EOF
```
---

> ### SSL/TLS
```bash
# Create a Private Key
openssl genrsa -out my.key 2048
# Create Signing Request
openssl req -new -key my.key -out my.csr -subj "/CN=mydomain.com/O=myorg"
# Sign Cert by CA
openssl x509 -req -in my.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out my.crt -days 365
# Display Cert Details
openssl x509 -in my.crt -noout -text
# Verify Cert
openssl verify -CAfile ca.crt my.crt
```

## ***Operations Deployment***
> ### Boot, Reboot, and Shutdown a System
```bash
sudo systemctl reboot
sudo systemctl reboot --force             #Force reboot
sudo systemctl reboot --force --force     #Last Option to do when reboot

sudo systemctl poweroff 
sudo systemctl poweroff --force

sudo shutdown 02:00                       #Shutdown at 2 am
sudo shutdown +30                         #Shutdown after 30 mins
sudo shutdown -r +15 'message to appear when reboot'    #Reboot after 15 mins with message
```
- Boot Options and system Info:
- OLD version of systemd used runlevel:

| Runlevel | Description|
| -------- | -----------|
| 1 | Single-user mode (rescue/maintenance) |
| 3 | Multi-user, console login only        |
| 5 | Multi-user, graphical (GUI) login     |

- New systemd use target Options of system-default when accessing:
    - `graphical.target`: Full system with graphical UI 
    - `multi-user.target`: Non-graphical, multi-user environment.
    - `rescue.target` & `emergency.target`: Minimal single-user environment with basic or No services.
```bash
sudo systemctl get-default                       # Check current default target
sudo systemctl set-default multi-user.target     # Set a new default target 
sudo systemctl isolate option.target             # Switch to a specific target 
```
---

> ### Manage Startup & Run and Services
- We will talk about Service Units
- Service unit exist in `/lib/systemd/system/name.service`
```bash
sudo systemctl cat ssh.service                   # view svc unit
sudo systemctl edit --full ssh.service           # Edit svc unit
sudo systemctl status ssh.service                # Status svc
sudo systemctl stop ssh.service                  # Stop svc
sudo systemctl start ssh.service                 # Start svc
sudo systemctl restart ssh.service              # Restart svc -> service disturbance
sudo systemctl reload ssh.service                # Reload svc -> No service disturbance
sudo systemctl reload-or-restart ssh.service     # Try to reload svc, if fail, it will restart
sudo systemctl enable ssh.service                # Enable start service on boot
sudo systemctl enable --now ssh.service          # Enable start service on boot and start it now
sudo systemctl disable ssh.service               # Disable start service on boot
sudo systemctl mask ssh.service                  # Safe lock to not start or enable svc without unmask it
sudo systemctl mask ssh.service                  # Unmask svc to start or enable 
sudo systemctl list-units --type service --all   # List all service units 
sudo systemctl daemon-reload                     # Reload our Systemd daemon
```
- Create a Service:
```shell
cat myapp.service << EOF
[Unit]
Description=My description
Documentation=
After=depended.service

[Service]
ExecStartPre=echo"myapp pre start"
ExecStart=path/to/script/service
KillMode=process
Restart=always
RestartSec=1
Type=simple

[Install]
WantedBy=multi-user.target
Alias=app2.service
EOF
```
---

> ### Diagnose and Manage Processes
- View Process and Resource Usage:
```bash
ps                          # Current shell processes
ps a                        # All processes associated with terminals
ps u                        # Show by user-oriented format
ps aux                      # Show all processes system-wide 
ps aux --sort=-%mem         # Show process sorted by memory    
ps l                        # Long output more details
ps f                        # Show hierarchical view of processes
ps p                        # List process of pid
ps u pid                    # List more details about process of pid 
ps -U kary                  # List process of user kary
pgrep -a proc_name          # Search processes by name 
top                         # Real-time process monitor
htop                        # Enhanced 'top' with better UI 
```

- `Niceness of a process`:
    - Niceness controls priority of processes.
    - Range: -20 (highest priority) to 19 (lowest priority).
```bash
# nice -n [nice_value] [command/proc]
# renice [nice_value] [proc_PID]
#-------------------------------------
nice -n +11 bash                        # Start bash with low priority
renice 7 11332                          # Change priority of process 11332 to 7
```

- `Killing Process`:
```bash
# kill -singal proc_pid
# pkill -signal proc_name
#--------------------------
kill -L                     # Show available signals
kill -singal proc_pid
pkill -signal proc_name

kill -15 1234         # Politely stop process 1234
kill -9 1234          # Force kill process 1234
kill -1 1234          # Reload config of process 1234
kill -19 1234         # Pause process 1234
kill -18 1234         # Resume process 1234
```

- Process on `Background & Foreground`
```bash
[Ctrl+Z]          # suspend (pause) current running process in terminal
command &         # Run Command in background
jobs              # List background or paused jobs
bg                # Resume it in background
fg [n]            # Bring it to foreground, [n] optional to specify the job to return it to fg
```

- `lsof` = List Open Files:
```bash
lsof -u kary                # Show all open files by user `kary`          
lsof -p 1234                # Show files opened by process with PID 1234  
lsof /etc/passwd            # Show who is using `/etc/passwd`             
```
---

> ### Locate and Analyze System Log Files
- `journalctl` reads logs collected by systemd-journald
- Status Error Warning Messages:
- Location: `/var/log/`
- 
```bash
sudo journalctl -u nginx            # Show logs for the nginx service
sudo journalctl -p err              # Show only error-level logs
sudo journalctl -p info -g '^c'     # Show info-level logs matching regex '^c'
sudo journalctl -b                  # Show logs since the last boot
sudo journalctl -S "2024-06-01" -T "2024-06-15"  # Show logs between specific dates   
last                                # History who log into system
lastlog                             # Show the most recent login of all users
```
---

> ### Schedule Tasks

+ ***Cron***         (can schedule task to every minutes)
- System wide Table: Path:`/etc/crontab`
```scss
* * * * *  command_to_run
│ │ │ │ │
│ │ │ │ └── Day of Week (0 - 7) (Sunday = 0 or 7)
│ │ │ └──── Month (1 - 12)
│ │ └────── Day of Month (1 - 31)
│ └──────── Hour (0 - 23)
└────────── Minute (0 - 59)
```
- Syntax:
    - `*`: Means "every" value in that position.
    - `,`: Means multiple individual values in a single field. : 0 9,17 * * * → Run at 9:00 AM and 5:00 PM every day
    - `-`: Means a range of values. : 0 9-17 * * * → run on the hour from 9 AM to 5 PM
    - `/`: Means "every Nth" value, starting from the leftmost number. : */5 * * * * → run every 5 minutes
- Alternative:
    - Create a script and add it to one of these paths
    - `/etc/cron.hourly/`, `/etc/cron.daily/`, `/etc/cron.monthly/`, `/etc/cron.weekly/`
```bash
crontab -e               # Edit your own cron jobs
crontab -l               # List your own cron jobs
crontab -r               # Delete your own cron jobs
sudo crontab -l -u mac   # List cron jobs of user "mac"
sudo crontab -l          # List cron jobs of root user
```
+ ***Anacron***      (can schedule task to every days only)
+ at           (Task should run once )
---

> ### Software Package Manager
- For Debian:
    - `dpkg` & `apt`
```bash
apt update 
apt upgrade
apt install nginx
apt autoremove nginx
apt search  nginx
```
---

> ### Configure the Repositories of Package Manager
- Path: `/etc/apt/source.list`
- This contain a list of repos that have packages to be installed
- In case of Installing package that is not the official repo of Ubuntu
    - Install Public Key
    - Convert its formate to binary by `gpg --dearmor`
    - Move the key to the apt keys dir ***`etc/apt/keyrings/`***
    - Define a source file for our package in /etc/apt/source.list.d/custom.list
```scss
deb [signed-by=/etc/apt/keyrings/custom.gpg] https://to/the/custom/repo/ <codename> <component>
```
---

> ### Availability of Resources and Processes
```bash
df -h
du -sh
free -h
lscpu 
lspci
```
---

> ### Change Kernel Runtime Parameters, Persistent and Non-Persistent
- Kernel parameters at runtime are configuration values that control how the Linux kernel behaves while the system is running
- Path for make a change for this Parameters permanent `/etc/sysctl.conf`
- Another way is by adding file contain the updated value in the dir `/etc/sysctl.d/*.conf`
```bash
sudo nano /etc/sysctl.conf                  # Permanent edit a parameters
sudo sysctl -p /etc/sysctl.d/custom.conf    # Immediately adjust parameters
```
---

> ### SELinux File and Process Contexts
- SELinux is Mandatory Access Control (MAC) system that uses contexts (labels) to control access.
```scss
user:role:type:level

```
- Policy Types
    - Targeted Policy (most common): Constrains only specific high-risk daemons (e.g., httpd, sshd). Other processes run unconfined.
    - MLS (Multi-Level Security) Policy: Supports hierarchical sensitivity levels. Used in environments with strict classification requirements.
- Enforcement Modes
    - Enforcing: Policies are enforced—violations are blocked and logged
    - Permissive: Violations are logged but not blocked.
    - Disabled: SELinux is turned off entirely.
---


> ### Manage and Configure Virtual Machines
- In Linux we use (QEMU-KVM):
    - Quick Emulator, Kernel-base virtual Machine
- Tools: `sudo VIRSH` = **Manage Virtual Machine from command line**

```bash
sudo apt install virt-manager
sudo virsh define vm-config.xml      # Define a new VM from XML without starting it
sudo virsh list --all 
sudo virsh start my-vm               # Boot a defined but stopped VM
sudo virsh reboot my-vm              # Soft reboot 
sudo virsh reset my-vm               # force reset 
sudo virsh shutdown my-vm            # Graceful shutdown
sudo virsh destroy my-vm             # Force-off like pulling the plug
sudo virsh undefine --remove-all-storage my-vm            # Delete domain vm
sudo virsh autostart my-vm           # Autostart vm when boot
sudo virsh dominfo my-vm             # Info about vm
sudo virsh setmaxmem my-vm 100M --config --maximum  # Set max Memory to 100M
sudo virsh setmem my-vm 100M --config   # Set memory to 100M

sudo virsh setvcpus my-vm 2 --config --maximum  # Set max cpu to 2 
```
- Create and Boot a Virtual Machine:
    - Step 1: Download small cloud image 
    - Step 2: Move it to `/var/lib/libvirt/images`
    - Step 3: Create VM with virt-install
    - Step 4: inject a password directly into the image
```bash
wget https://cloud-images.ubuntu.com/minimal/releases/focal/release/ubuntu-20.04-minimal-cloudimg-amd64.img
sudo mv ubuntu-20.04-minimal-cloudimg-amd64.img /var/lib/libvirt/images/ubuntu-min.qcow2
sudo chown libvirt-qemu:kvm /var/lib/libvirt/images/ubuntu-min.qcow2
virt-install --name ubuntu-min --memory 1024 --vcpus 1 --disk path=/var/lib/libvirt/images/ubuntu-min.qcow2,format=qcow2 --import --os-type linux --os-variant ubuntu20.04 --network network=default --noautoconsole
sudo apt install libguestfs-tools
sudo virt-customize -a /var/lib/libvirt/images/ubuntu-min.qcow2 --root-password password:root123





 sudo virsh console my-vm       # Access the vm cli
```



---
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
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
sudo tar czfP logs.tar.gz /var/log/
tar tf logs.tar 1> tar_data.txt
tar xf archive.tar.gz -C /tmp
bzip2 --keep /home/bob/file.txt
sort values.conf |uniq  > values.sort           # Sort Uniqe values
sort -duf values.conf  > values.sorted          # sort Uniqe values with ignore case
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
openssl req -newkey rsa:4096 -keyout priv.key -out cert.csr
openssl req -x509 -noenc -keyout priv.key -out kodekloud.crt -days 365
openssl x509 -in my.crt -text
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
sudo shutdown -c
sudo systemctl set-default graphical.target
sudo systemctl is-enabled sshd.service
sudo systemctl unmask apache2
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
sleep 10 --> [Ctrl+Z]
jobs
pgrep -a sshd
renice 9 1468
sudo lsof -p 1 > files.txt
sudo journalctl -u ssh
pgrep -a rpcbind | cut -d " " -f 1 > pid.txt
sudo kill -SIGHUP 1468
sudo grep -r 'reboot' /var/log > reboot.log
sudo journalctl -p err > .priority/priority.log
sudo journalctl -p info -g '^c' > .priority/boot.log
ps u 1 > /home/bob/resources.txt

sudo sysctl -p /etc/sysctl.d/pre.conf 
sysctl -w net.ipv6.conf.lo.seg6_enabled=1
sysctl -w kernel.modules_disabled=1
ls -Z /bin/sudo
chcon -t httpd_sys_content_t /var/index.html
sudo setenforce 0
sudo restorecon -R /var/log/
## Notes
```