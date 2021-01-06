#!/bin/sh

API="http://localhost:4741"
URL_PATH="/spots"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo
