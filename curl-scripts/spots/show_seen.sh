#!/bin/sh

API="http://localhost:4741"
URL_PATH="/spots"

curl "${API}${URL_PATH}/${SEEN}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo
