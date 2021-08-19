#!/bin/bash
while getopts u:i:f: flag
do
    case "${flag}" in
        u) user=${OPTARG};;
        i) ip=${OPTARG};;
        f) folder=${OPTARG};;
    esac
done
echo -ne "running deployment script...\n"
npm run build
echo -ne "1/3\033[0K\r"
zip -r ./eli.zip ./build
echo -ne "2/3\033[0K\r"
scp eli.zip "$user@$ip:~/$folder"
echo -ne "3/3\033[0K\r"
rm eli.zip
echo -ne "Done...\n"