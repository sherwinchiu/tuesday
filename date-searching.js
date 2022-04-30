function findDate(text){
    const filter1 = /(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)(?:\s|,)\d{1,2}(?:\s|,)\d{4}/gmi; //3-letter month, day, year
    const filter2 = /(?:january|february|march|april|may|june|july|august|sept|october|november|december)(?:\s|,)\d{1,2}(?:\s|,)\d{4}/gmi; //full month, day, year
    const filter3 = /\d{4}(?:\/|-|\s)\d{2}(?:\/|-|\s)\d{2}/gmi; // YYYY/MM//DD
    const filter4 = /\d{2}(?:\/|-|\s)\d{2}(?:\/|-|\s)\d{4}/gmi; // DD/MM/YYYY

    // Note: For the most part these work, I can still add extra filters and check for valid dates later

    filter1Matches = text.match(filter1)
    if (filter1Matches !== null){
        return filter1Matches[0]
    }
    filter2Matches = text.match(filter2)
    if (filter2Matches !== null){
        return filter2Matches[0]
    }
    filter3Matches = text.match(filter3)
    if (filter3Matches !== null){
        return filter3Matches[0]
    }
    filter4Matches = text.match(filter4)
    if (filter4Matches !== null){
        return filter1Matches[0]
    }


}