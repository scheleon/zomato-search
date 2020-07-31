#!/bin/bash

user_key="34e6c6f8c0f1539e21225653c9bd1ac0"

cuisines_id="*"
entity_type="city"
entity_id=""
cuisines=""

city="$1"
length=$(echo $city | grep -oE "^[a-zA-Z0-9 ,.]+$")
if [[ ${#length} -lt 1 ]]; then
	echo "{\"error\": \"No restaurants found\"}"  
	exit 1
fi

# Get city details
entity_details=$(curl -G -X GET \
	--header "Accept: application/json" \
	--header "user-key: $user_key" \
	--data-urlencode "q=$city" \
	"https://developers.zomato.com/api/v2.1/cities" 2> /dev/null)

# City id for calls to other apis
entity_id=$(echo $entity_details | jq '.location_suggestions[0] | .id')

if [[ ${#entity_id} -lt 1 ]]; then
	echo "{\"error\": \"No restaurants found\"}"  
	exit 1
fi

cuisines_string="$2"
length=$(echo $cuisines_string | grep -oE "^[a-zA-Z0-9 ,.]+$")
if [[ ${#length} -lt 1 ]]; then
	echo "{\"error\": \"No restaurants found\"}"  
        exit 1
else
	cuisines=$cuisines_string
fi

# Search for cuisine id
if [[ $cuisines != "null" ]]; then

	cuisines_details=$(curl -G -X GET --header \
		"Accept: application/json" \
		--header "user-key: $user_key" \
		--data-urlencode "city_id=$entity_id" \
		"https://developers.zomato.com/api/v2.1/cuisines" 2> /dev/null)
	cuisines=$(echo "$cuisines_details" | jq ".cuisines[] | select(.cuisine.cuisine_name | test(\"${cuisines}\")) | .cuisine.cuisine_id" | head -n 1)
else
	cuisines="*"
fi

max_cost_for_two=$3
length=$(echo $max_cost_for_two | grep -oE "^[0-9]+$")
if [[ ${#length} -lt 1 ]]; then
       	echo "{\"error\": \"No restaurants found\"}"  
        exit 1
fi

# Main api to search for restaurants
restaurants=$(curl -G -X GET --header \
        "Accept: application/json" \
        --header "user-key: $user_key" \
        --data-urlencode "entity_id=$entity_id" \
	--data-urlencode "cuisines=$cuisines" \
        "https://developers.zomato.com/api/v2.1/search?entity_type=city&sort=rating" 2> /dev/null \
	| jq "[.restaurants[] | select(.restaurant.average_cost_for_two <= $max_cost_for_two) | {name: .restaurant.name, cuisines: .restaurant.cuisines, address: .restaurant.location.address, cost_for_two: .restaurant.average_cost_for_two}]")

startIndex=0
length=5

searchResultLen=$(echo $restaurants | jq ". | length" )

if [[ $searchResultLen -eq 0 ]]; then
	echo "{\"error\": \"No restaurants found\"}"
	exit 1
fi

if [[ $searchResultLen -lt 5 ]]; then
	length=$searchResultLen
fi

echo $restaurants | jq "[.[range($startIndex;$length)]]"
