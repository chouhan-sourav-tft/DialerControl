const { BaseAction } = require('../setup/baseAction');

exports.DialerRules = class DialerRules extends BaseAction {
    constructor() {
        super();
    }

    /**
     * Creating elements object for initializing required locators
     */
    elements = {
        dialerRuleTab: '//span[text()="Dialer rules manager"]',
        dialerName: '//input[@name="dial-rule-name"]',
        dialerControlOutboundCampaign: '//select[@id="dialer-control-active-campaign-select"]',
        ratio: '[data-ratio="1"]',
        searchDatabase: '(//input[@data-translate="tbl-search"])[1]',
        previousDatabase: '[class="odd highLighRow"]',
        validateClosedContacts: '[id="closed_contacts_label"]',
        recycleTabCallOutcome: '[class="select with-angle-down valid"]',
        recycleInterval: '[name="recycle_rule_duration"]',
        recycleMaxTries: '[name="recycle-max-tries-input"]',
        redifineButton: '[id="finish-campaign-modal-btn"]',
        saveCampaign: '[data-translate="btnFinishCampaign"]',
        submitButton: '[id="bot2-Msg1"]',
        phoneNumberButton: '[id="voice-field-first_phone-btn"]'
    };


    async selectDialerRuleTab(tab) {
        await this.waitForSelector(this.elements.dialerRuleTab);
        await this.click(this.elements.dialerRuleTab);
    }

    async fillDialerRules(dialerRule) {
        await this.waitForSelector(this.elements.dialerName);
        await this.click(this.elements.dialerName);
        await this.clearField(this.elements.dialerName);
        await this.type(this.elements.dialerName, dialerRule.dialerName);
    }

    async clickRecycle(button) {
        let recycleButton = `//div[@class="col col-sm-12"]//span[text()="${button}"]`;
        await this.waitForSelector(recycleButton);
        await this.click(recycleButton);
    }

    /*
    * Function to update recycle settings
    * @param {object} - settings
    * @param {string} - settings.callOutcome - outcome
    * @param {string} - settings.recycleInterval - time interval
    * @param {string} - settings.maxRetries - max retries
    * @returns {void} nothing
    */
    async recycleSettings(settings) {
        await this.selectOptionByValue(this.elements.recycleTabCallOutcome, settings.callOutcome
        );
        await this.forceClick(this.elements.recycleInterval);
        await this.type(this.elements.recycleInterval, settings.recycleInterval
        );
        await this.type(this.elements.recycleMaxTries, settings.maxTries);
    }

    async updateDialerControlSettings(settings) {
        // need to wait to option to load
        await this.wait(5);
        await this.dropdownOptionSelect(
            this.elements.dialerControlOutboundCampaign,
            settings.campaign
        );
        if (await this.isVisible(this.elements.ratio)) {
            await this.click(this.elements.ratio);
        };
        let locator = `//label[@class="radio-inline"]//span[text()="${settings.sortContactsPriority}"]`;
        await this.click(locator);
    }

    async clickPreviousDatabase(databaseName) {
        await this.wait(3); //Require time to load the fields
        await this.waitForSelector(this.elements.searchDatabase);
        await this.forceClick(this.elements.searchDatabase);
        await this.type(this.elements.searchDatabase, databaseName);
        await this.pressKey('Enter');
        await this.wait(6); //Results take time to get reflected
        await this.waitForSelector(this.elements.previousDatabase)
    }

    async validateContacts() {
        await this.waitForSelector(this.elements.validateClosedContacts);
        await this.shouldContainText(this.elements.validateClosedContacts, '0');
    }

    /**
    * Function to save the campaign
    * @returns {void} nothing
    */
    async finishCampaign() {
        await this.waitForSelector(this.elements.saveCampaign);
        await this.click(this.elements.saveCampaign);
        await this.click(this.elements.redifineButton);
        await this.waitForSelector(this.elements.submitButton);
        await this.click(this.elements.submitButton);
        // adding wait here so that campaign updated successfully
        await this.wait(5);
    }

    async verifyPhoneNumber(phoneNumber) {
        await this.waitForSelector(this.elements.phoneNumberButton);
        await this.shouldVisible(this.elements.phoneNumberButton);
        await this.shouldContainText(this.elements.phoneNumberButton, phoneNumber);
    }
}