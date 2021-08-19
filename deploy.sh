#!/bin/bash
echo -ne "running deployment script...\n"
npm run build
echo -ne "1/3\033[0K\r"
zip -r ./eli.zip ./build
echo -ne "2/3\033[0K\r"
scp eli.zip martin@143.244.129.51:~/projects/eli/
echo -ne "3/3\033[0K\r"
rm eli.zip
echo -ne "Done...\n"