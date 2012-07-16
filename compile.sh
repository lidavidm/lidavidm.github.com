#!/bin/sh

cd source
ruhoh compile
rsync -a compiled/ ..
rm -rf compiled/
