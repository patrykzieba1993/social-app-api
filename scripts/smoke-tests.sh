#!/usr/bin/env bash

APP_NAME=$1

url_1=( "200" "http://$APP_NAME.herokuapp.com/publications" );
# url_2=( "200" "http://$APP_NAME.herokuapp.com/perks/widgets/v2/publications/bt/products?type=frontpage" );

result=0;

i=1;
while [ true ]
do
  #expectedCode
  v1="url_$i[0]";
  expectedCode=${!v1};

  # url
  v2="url_$i[1]";
  url=${!v2};

  # Break if no more URLs
  [ $url ] || break;

  # Fetch status code
  code=$(curl -I $url 2>/dev/null | head -n 1 | cut -d$' ' -f2)
  if [ "$code" != "$expectedCode" ]; then
    echo "[Smoke tests][Error] Bad response code. Expect code $expectedCode != $code for URL: $url";
    # Count errors
    ((result++))
  else
    echo "[Smoke tests][Ok] Expect code $expectedCode == $code for URL: $url";
  fi;
  ((i++))
done;

exit $result;