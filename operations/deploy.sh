#!/bin/bash

s3cmd --config=/Users/k/.s3LGfullaccess sync public/ s3://lookingglassvr --exclude '.DS_Store'
s3cmd setacl --config=/Users/k/.s3LGfullaccess s3://lookingglassvr/ --acl-public --recursive
