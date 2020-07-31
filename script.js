var form = document.getElementById("search-form");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);
result
function formTable(data, div) {
    var html = '<table class="table" id="restaurants">'
    html += '<tr>'

    for(var key in data[0]){
        html += '<th>'+key+'</th>'
    }

    html += '</tr>'
    
    for(var i = 0; i < data.length; i++){
        html += '<tr>';
        value = data[i]
        for(var key in value){
           html += '<td>'+value[key]+'</td>';
       }
       html += '<tr>';
    }

    html += '</table>'
    console.log(html)
    div.innerHTML = html
}

document.getElementById("find").addEventListener("click", async function(){
    city = document.getElementById('city').value
    cuisines = document.getElementById('cuisines').value
    max_for_two = document.getElementById('max_for_two').value
    params = {city: city, cuisines: cuisines, max_for_two: max_for_two}

    url = document.URL + 'restaurants?'
    
    var searchParams = new URLSearchParams()
    
    Object.keys(params).forEach(key => searchParams.append(key, params[key]))
    url = url + searchParams.toString()

    let response = await fetch(url);

    if (response.ok) { // if HTTP-status is 200-299
    // get the response body (the method explained below)
        let json = await response.json();
        if(json.error){
            alert("Error: " + json.error)
            return
        }
        result = json
        formTable(json, document.getElementById('result'))
    } else {
        alert("HTTP-Error: " + response.status)
    }
})

