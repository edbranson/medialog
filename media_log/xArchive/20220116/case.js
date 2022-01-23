
for (var j = 0; j < localEntries.length; j++) {
    switch (localEntries.length > 0){
    case 0: 
        userIdChecked.includes(localEntries[j].user)
        && statusChecked.includes(localEntries[j].status)
        && mediaChecked.includes(localEntries[j].type)
        && ratingChecked.includes(localEntries[j].rating);

        entriesFiltered.push(localEntries[j]);
        break;
    case 1: 
        userIdChecked.includes(localEntries[j].user)
        && statusChecked.includes(localEntries[j].status)
        && mediaChecked.includes(localEntries[j].type)
        && !ratingChecked.includes(localEntries[j].rating);

        entriesFiltered.push(localEntries[j]);
        break;    
    case 2: 
        userIdChecked.includes(localEntries[j].user)
        && statusChecked.includes(localEntries[j].status)
        && !mediaChecked.includes(localEntries[j].type)
        && !ratingChecked.includes(localEntries[j].rating);

        entriesFiltered.push(localEntries[j]);
        break;
    case 3: 
        userIdChecked.includes(localEntries[j].user)
        && !statusChecked.includes(localEntries[j].status)
        && !mediaChecked.includes(localEntries[j].type)
        && !ratingChecked.includes(localEntries[j].rating);

        entriesFiltered.push(localEntries[j]);
        break;    
    case 4: 
        !userIdChecked.includes(localEntries[j].user)
        && statusChecked.includes(localEntries[j].status)
        && mediaChecked.includes(localEntries[j].type)
        && ratingChecked.includes(localEntries[j].rating);

        entriesFiltered.push(localEntries[j]);
        break;
    case 5: 
        !userIdChecked.includes(localEntries[j].user)
        && !statusChecked.includes(localEntries[j].status)
        && mediaChecked.includes(localEntries[j].type)
        && ratingChecked.includes(localEntries[j].rating);

        entriesFiltered.push(localEntries[j]);
        break;
    case 6: 
        !userIdChecked.includes(localEntries[j].user)
        && !statusChecked.includes(localEntries[j].status)
        && !mediaChecked.includes(localEntries[j].type)
        && ratingChecked.includes(localEntries[j].rating);

        entriesFiltered.push(localEntries[j]);
        break;
    case 7: 
        !userIdChecked.includes(localEntries[j].user)
        && !statusChecked.includes(localEntries[j].status)
        && mediaChecked.includes(localEntries[j].type)
        && !ratingChecked.includes(localEntries[j].rating);

        entriesFiltered.push(localEntries[j]);
        break;
    case 8: 
        !userIdChecked.includes(localEntries[j].user)
        && statusChecked.includes(localEntries[j].status)
        && !mediaChecked.includes(localEntries[j].type)
        && !ratingChecked.includes(localEntries[j].rating);

        entriesFiltered.push(localEntries[j]);
        break;
    default:
        entriesFiltered.push(localEntries[j]);                         
    }
};    