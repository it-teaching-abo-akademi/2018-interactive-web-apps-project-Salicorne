#!/bin/bash
rm -r build docs
npm run build
cp -r build docs
git add docs
