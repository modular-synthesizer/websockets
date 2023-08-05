#!/usr/bin/env bash

function web {
  npm run start
}

function shell {
  /bin/sh
}

case "$1" in
  "web")
  web
  ;;

  "shell")
  shell
  ;;
esac