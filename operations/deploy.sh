#!/bin/bash

s3cmd --config=~/.s3LGfullaccess sync public/ s3://lookingglassvr --exclude '.DS_Store'
s3cmd setacl --config=~/.s3LGfullaccess s3://lookingglassvr/ --acl-public --recursive
