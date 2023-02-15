const { When, Then } = require('@cucumber/cucumber');
const { DialerRules } = require('../page-objects/DialerRules.po');
const { VoiceChannel } = require('../page-objects/VoiceChannel.po');


const dialerRules = new DialerRules();
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

Then('user click on the Recycle button', async () => {
    await dialerRules.clickRecycle();
});

Then('in dialer control menu choose the following', async (dataTable) => {
    const settings = dataTable.rowsHash();
    await dialerRules.updateDialerControlSettings(settings);
});

Then('user click the previously created DB', async () => {
    let dbName = global.newDBName[0];
    await dialerRules.clickPreviousDatabase((await dbName).toString());
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
