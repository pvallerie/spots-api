#!/bin/bash

API="http://localhost:4741"
URL_PATH="/spots"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "spot": {
      "name": "'"${NAME}"'",
      "seen": "'"${SEEN}"'",
      "location": "'"${LOCATION}"'",
      "notes": "'"${NOTES}"'"
    }
  }'

echo
