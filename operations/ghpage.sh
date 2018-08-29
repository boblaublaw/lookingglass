#!/bin/bash
git subtree push --prefix public origin gh-pages
/bin/echo -n "soon available at: http://"
cat public/CNAME
