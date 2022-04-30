function findDate(text){
    /*
    Given a string, searches for instances of dates and returns it in the 
    format of the google calendar (in string format, YYYYMMDD), returns null if
    and only if no date has been found
    */
    const filter = /(?:(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)(?:\s|,)\d{1,2}(?:\s|,)\d{4}|(?:january|february|march|april|may|june|july|august|sept|october|november|december)(?:\s|,)\d{1,2}(?:\s|,)\d{4}|\d{4}(?:\/|-|\s)\d{1,2}(?:\/|-|\s)\d{1,2}|\d{1,2}(?:\/|-|\s)\d{1,2}(?:\/|-|\s)\d{4})/gmi; 
    //format options from left-to-right: 3-letter month, day, year | full month, day, year | YYYY/MM/DD | DD/MM/YYYY
    // Note: For the most part these work, I can still add extra filters and check for valid dates later
    const filter1 = /(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)(?:\s|,)\d{1,2}(?:\s|,)\d{4}/gmi; // 3-letter month, day, year
    const filter2 = /(?:january|february|march|april|may|june|july|august|sept|october|november|december)(?:\s|,)\d{1,2}(?:\s|,)\d{4}/gmi; //full month, day, year
    const filter3 = /\d{4}(?:\/|-|\s)\d{1,2}(?:\/|-|\s)\d{1,2}/gmi; // YYYY/M(M)/D(D)
    const filter4 = /\d{1,2}(?:\/|-|\s)\d{1,2}(?:\/|-|\s)\d{4}/gmi; // D(D)/M(M)/YYYY

    let day;
    let month;
    let year;

    //checks through each filter
    let filterMatches = text.match(filter);
    if (filterMatches === null){
        return;
    }

    let date = filterMatches[0].toLowerCase();

    if (filter1.test(date)){
        switch(date.slice(0, 3)){
            case 'jan':
                month = '01';
            case 'feb':
                month = '02';
            case 'mar':
                month = '03';
            case 'apr':
                month = '04';
            case 'may':
                month = '05';
            case 'jun':
                month = '06';
            case 'jul':
                month = '07';
            case 'aug':
                month = '08';
            case 'sep':
                month = '09';
            case 'oct':
                month = '10';
            case 'nov':
                month = '11';
            case 'dec':
                month = '12';
        } 
        let ddyyyy = getDayandYear(date.substr(4));
        day = ddyyyy[0];
        year = ddyyyy[1];
        
        
    }else if (filter2.test(date)){
        let dayAndYear;
        if (date.includes('january')){
            month = '01';
            dayAndYear = date.substr(8);
        }else if (date.includes('february')){
            month = '02';
            dayAndYear = date.substr(10); 
        }else if (date.includes('march')){
            month = '03';
            dayAndYear = date.substr(6); 
        }else if (date.includes('april')){
            month = '04';
            dayAndYear = date.substr(6); 
        }else if (date.includes('may')){
            month = '05';
            dayAndYear = date.substr(4);
        }else if (date.includes('june')){
            month = '06';
            dayAndYear = date.substr(5);
        }else if (date.includes('july')){
            month = '07';
            dayAndYear = date.substr(5);
        }else if (date.includes('august')){
            month = '08';
            dayAndYear = date.substr(7);
        }else if (date.includes('september')){
            month = '09';
            dayAndYear = date.substr(10);
        }else if (date.includes('october')){
            month = '10';
            dayAndYear = date.substr(8);
        }else if (date.includes('november')){
            month = '11';
            dayAndYear = date.substr(9);
        }else{ //this is december because there is no other month left to check and regex already checked for valid months
            month = '12';
            dayAndYear = date.substr(9);

        }
        let ddyyyy = getDayAndYear(dayAndYear);
        day = ddyyyy[0];
        year = ddyyyy[1];

    }else if (filter3.test(date)){
        year = date.slice(0,4);
        let mmdd = getDayAndMonth(date.substr(5));
        month = mmdd[0];
        day = mmdd[1];
    }else if (filter4.test(date)){
        year = date.substr(date.length - 4);
        let ddmm = getDayAndMonth(date.slice(date.slice(0, date.length - 4)));
        day = ddmm[0];
        month = ddmm[1];

    }else{
        return;
    }

    return year + month + day
}


function getDayAndMonth(date){
    /*
    given a string with the month and date (or vice versa) separated by any 
    character, returns the number month and day in an array in string form 
    in the same order.

    precondition: the given string follows the format MM/DD or DD/MM, where
    MM is 1 or 2 digits representing the month, DD is 1 or 2 digits 
    representing the day, and / is any character (since it is ignored).
    */
   if (date.length == 5){ // date is in the form MM/DD or DD/MM
       return [date.slice(0, 2), date.slice(3, 5)];
   }else if (date.length == 3){ //date is in the form M/D or D/M
       return ['0' + date.charAt(0), date.charAt(2)];
   }else{ 
        /* date is in the form M/DD, D/MM, MM/D, or D/MM, since this is the 
        only option left based on the precondition */
        if (isNaN(date.charAt(1))){ //M/DD or D/MM
            return ['0' + date.charAt(0), date.substr(2)];
        }else{ //DD/M or DD/M
            return [datr.slice(0, 2), '0' + date.substr(date.length - 1)];
        }
   }


} 

function getDayAndYear(date){
    /*
    given a string with the day and year separated by any character, returns 
    the number month and day in an array in string form in the same order.

    precondition: the given string follows the format DD/YYYY, where DD is 1 or
    2 digits representing the day, YYYY is always 4 digits, and / is any 
    character (since it is ignored).
    */
    if (date.length == 7){ //in the form DD/YYYY
        return[date.slice(0, 2), date.substr(3)];
    }else{ //in the form D/YYYY
        return ['0' + date.charAt(0), date.substr(2)];
    }


} 
