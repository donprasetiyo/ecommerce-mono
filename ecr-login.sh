#!/bin/bash

aws ecr get-login-password --region $2 | docker login --username AWS $1