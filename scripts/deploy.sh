#!/bin/bash

docker build --pull -t tipbot .

docker run -d -p 3000:3000 tipbot