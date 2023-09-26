export default function fetchUpdate(url, gameJson,alertMessage,locationHTML, data) {
    fetch(url, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'PUT',
        body: gameJson
    }).then((response) => {
        if (response.status === 200) {
            alert(alertMessage);
            window.location.href = locationHTML;
        } 
        else{
            response.text().then((data) => {
                debugger;
                console.log(data);
            });
        }
    }).catch((response) => {
            debugger;
            console.log(data);
    });
}