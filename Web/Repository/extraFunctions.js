export function convertTextMonth(month) {
    switch (month) {
        case '01': return 'Enero';
        case '02': return 'Febrero';
        case '03': return 'Marzo';
        case '04': return 'Abril';
        case '05': return 'Mayo';
        case '06': return 'Junio';
        case '07': return 'Julio';
        case '08': return 'Agosto';
        case '09': return 'Septiembre';
        case '10': return 'Octubre';
        case '11': return 'Noviembre';
        case '12': return 'Diciembre';
        default: return 'Mes no válido';
    }
}

export function tournamentPathImage(tournament){
    switch(tournament){
        case "Copa Sudamericana":{return "./Images/Tournaments/Copa Sudamericana.png";}
        case "Liga Boliviana":{return "./Images/Tournaments/Liga Boliviana.png";}
        case "Amistoso":{return "./Images/Tournaments/amistoso.png";}
        default:{return "./Images/Tournaments/Liga Boliviana.png";}
    }
}