const qs = require('qs');
const axios = require('axios');
const { readCsv, readSingleCsv } = require('./readcsvhelper.js');
const { writeCsv } = require('./writecsvhelper.js');
const { logger } = require('./loggerhelper.js');

let fileName = Math.random().toString(36).substring(2);

const moveCapi = async (phone, appName, appId, wabaId, phoneId, forceMigrate = false, ldap) => {
    const url = "https://webhook.site/9b8438a0-fcd0-420e-9247-85e362fa052a";
    const headers = {
        'Authorization': ldap,
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    const bodydata = qs.stringify({
        'phone': phone,
        'clientName': appName,
        'wabaId': wabaId,
        'phoneId': phoneId,
        'forceMigrate': forceMigrate,
        'appId': appId
    });
    const response = await axios.post(url, bodydata, { headers });
    return response;
};

const processCsvData = async (csvData, forceMigrate, ldap) => {
    for (let data of csvData) {
        try {
            if (!data['AppID'] || !data['AppName'] || !data['PhoneNumber'] || !data['WabaId'] || !data['PhoneId']) {
                return "Invalid data";
            }
            if (forceMigrate && data['Status'] === 400 && data['Response'].message === 'Given phone number does not match with app details record') {
                let response = await moveCapi(data['AppID'], data['AppName'], data['PhoneNumber'], data['WabaId'], data['PhoneId'], forceMigrate, ldap);
                writeCsv([{ AppID: data['AppID'], AppName: data['AppName'], PhoneNumber: data['PhoneNumber'], WabaId: data['WabaId'], PhoneId: data['PhoneId'], Status: response.status, Response: JSON.stringify(response.data) }], fileName);
                logger(`${data['PhoneNumber']} | status=${response.status} | ${JSON.stringify(response.data)}`);
            }

            let response = await moveCapi(data['AppID'], data['AppName'], data['PhoneNumber'], data['WabaId'], data['PhoneId'], forceMigrate, ldap);

            writeCsv([{ AppID: data['AppID'], AppName: data['AppName'], PhoneNumber: data['PhoneNumber'], WabaId: data['WabaId'], PhoneId: data['PhoneId'], Status: response.status, Response: JSON.stringify(response.data) }], fileName);

            logger(`${data['PhoneNumber']} | status=${response.status} | ${JSON.stringify(response.data)}`);

        }
        catch (error) {
            if (error.response && error.response.status === 400 && error.response.data.message === "Given phone number does not match with app details record") {
                writeCsv([{ AppID: data['AppID'], AppName: data['AppName'], PhoneNumber: data['PhoneNumber'], WabaId: data['WabaId'], PhoneId: data['PhoneId'], Status: error.response.status, Response: JSON.stringify(error.response.data) }], fileName);
                logger(`${data['PhoneNumber']} | status=${error.response.status} | ${error.response.data}`);
            };
            logger(`${error} | status=${error.response.status} | message=${JSON.stringify(error.response.data)}`)
        }
    }
};

const processData = async (ldap, forceMigrate = false) => {
    if (!forceMigrate) {
        const csvData = await readCsv('uploads');
        await processCsvData(csvData, forceMigrate, ldap);
    } else {
        const forceCSVData = await readCsv('result', true, fileName);
        await processCsvData(forceCSVData, forceMigrate, ldap);
    }
};

module.exports = { processData };