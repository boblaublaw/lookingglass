#!/bin/bash

s3cmd --config=${HOME}/.s3LGfullaccess --exclude '.DS_Store' sync public/ s3://lookingglassvr/
s3cmd setacl --config=${HOME}/.s3LGfullaccess --acl-public --recursive s3://lookingglassvr/
s3cmd --config=${HOME}/.s3LGfullaccess -m text/css modify s3://lookingglassvr/css/main.css
