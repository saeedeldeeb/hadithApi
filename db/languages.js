module.exports.LANGUAGES = Object.freeze({
    LANGUAGES: ['ar','en']
})

function selectedLanguage(parameter) {
    let lan;
    switch (parameter) {
        case 'en':
            lan = 'En_Name'
            break;
        case 'ar':
            lan = 'Ar_Name';
            break;
        default:
            lan = 'Not supported';
    }
    return lan;
}
module.exports.selectedLanguage = selectedLanguage;
