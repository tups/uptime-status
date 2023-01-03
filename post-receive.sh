#!/bin/bash
declare -A branches=(
    [develop]=1    [master]=1
)

TARGET="/var/www/status.beekube.com/"
GIT_DIR="/home/tups/deploy/status-beekube.git"

while read oldrev newrev ref
do
        BRANCH=${ref/"refs/heads/"/""}
        if [[ -n "${branches[$BRANCH]}" ]];
        then
                echo "Ref $ref received. Deploying ${BRANCH1} branch to prod..."
                sudo chown tups:www-data -R $TARGET
                git --work-tree=$TARGET --git-dir=$GIT_DIR checkout $BRANCH -f
                cd $TARGET
                composer install
                sudo chown www-data:www-data -R $TARGET
        else
                echo "Ref $ref received. Doing nothing: you can't deploy ${BRANCH} branch on this server."
        fi
done
