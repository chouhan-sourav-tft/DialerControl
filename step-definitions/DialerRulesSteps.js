const { When, Then } = require('@cucumber/cucumber');
const { DialerRules } = require('../page-objects/DialerRules.po');
const { VoiceChannel } = require('../page-objects/VoiceChannel.po');


const dialerRules = new DialerRules();

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

Then('user click the previously created DB', async () => {
    databaseDetails = {
        'dbName': global.newDBName[element.databaseIndex].toString(),
    };
    await dialerRules.clickPreviousDatabase(databaseDetails.dbName)
})

Then('user validate that all contacts are closed', async () => {
    await dialerRules.validateContacts();
})

Then('user clicks the finish button', async () => {
    await dialerRules.finishCampaign();
})

Then('verify all the contacts {string} loaded in database are triggered', async (phoneNumber) => {
    await dialerRules.verifyPhoneNumber(phoneNumber);
}
);