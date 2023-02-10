const { When, Then } = require('@cucumber/cucumber');
const { DialerRules } = require('../page-objects/DialerRules.po');
const { BaseAction } = require('../setup/baseAction');
const { VoiceChannel } = require('../page-objects/VoiceChannel.po');


const dialerRules = new DialerRules();
const action = new BaseAction();
const voiceChannel = new VoiceChannel();

global.newDBName = [];

When('user go to the {string} tab', async (tab) => {
    await dialerRules.selectDialerRuleTab(tab);
});

Then('user configure the folllowing rule', async (dataTable) => {
    const dialerRule = dataTable.rowsHash();
    await dialerRules.fillDialerRules(dialerRule);
});

When('user set the following values in the previously added line', async (dataTable) => {
    const settings = dataTable.rowsHash();
    await dialerRules.recycleSettings(settings);
});

Then('user click on the {string} button', async (button) => {
    await dialerRules.clickRecycle(button);
});

Then('in dialer control menu choose the following', async (dataTable) => {
    const settings = dataTable.rowsHash();
    await dialerRules.updateDialerControlSettings(settings);
});

Then('user click the previously created DB', async (datatable) => {
    let dbName = '';
    let databaseDetails = '';
    datatable.hashes().forEach(async (element) => {
        // waiting here so that database upload here
        await action.wait(2);
        if (element.databaseIndex) {
            dbName = global.newDBName[element.databaseIndex];
        }
        else {
            dbName = action.getRandomString('_database');
            global.newDBName.push(dbName.toString());
        }
        databaseDetails = {
            'databaseCampaign': element.databaseCampaign,
            'optionName': element.optionName,
            'optionPhone1': element.optionPhone1
        };
    });
    await dialerRules.clickPreviousDatabase((await dbName).toString(), databaseDetails);
});

Then('user validate that all contacts are closed', async () => {
    await dialerRules.validateContacts();
    await dialerRules.deleteDatabase();
});

Then('user clicks the finish button', async () => {
    await dialerRules.finishCampaign();
});

Then('verify all contacts loaded in the database are triggered', async (callData) => {
    let databaseDetails = callData.rowsHash();
    const phoneList = databaseDetails.number.split(',');
    for (let i = 0; i < phoneList.length; i++) {
        let phoneNumber = await (await voiceChannel.getPhoneNumber()).replace(/\s+/g, '');
        await voiceChannel.containSubstring(databaseDetails.number, phoneNumber);
        await voiceChannel.verifyAndClickPhoneNumber(phoneNumber);
        //function to verify error warning for invalid number
        await dialerRules.verifyErrorWarning();
        await voiceChannel.wait(2);
        await voiceChannel.submitOutcomes(
            databaseDetails.outcomeGroup,
            databaseDetails.outcomeName);
    }
});