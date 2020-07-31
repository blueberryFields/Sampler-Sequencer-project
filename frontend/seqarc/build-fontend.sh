#!/bin/bash

# Backup samples, otherwise they will disappear
mv build/samples ./samples
# Build app
sudo npm run build
# Put back samples in buildfolder
mv ./samples build/samples
