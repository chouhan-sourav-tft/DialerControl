const { BaseAction } = require('../setup/baseAction');

exports.DialerRules = class DialerRules extends BaseAction {
    constructor() {
        super();
    }

    /**
     * Creating elements object for initializing required locators
     */
    elements = {
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
        phoneNumberButton: '[id="voice-field-first_phone-btn"]',
        dataTable: '(//td[contains(@class,"sorting_1")])[1]/following-sibling::td[1]',
        databaseEdit: '(//span[@data-translate="editselected"])[1]',
        deleteDatabase: '#delete-db-button',
        confirmDeleteDatabase: '#yesdeleteDB',
        popUpMsg: '#newContentdiv'
    };

    /** 
    * Function to select dialer rule tab
    * @returns {void} nothing
    */
    async selectDialerRuleTab(tab) {
        let dialerRuleTab = `//span[text()="${tab}"]`;
        await this.waitForSelector(dialerRuleTab);
        await this.click(dialerRuleTab);
    }

    /** *
    * Function to fill dialer rules
    * @returns {void} nothing
    */
    async fillDialerRules(dialerRule) {
        await this.waitForSelector(this.elements.dialerName);
        await this.click(this.elements.dialerName);
        await this.clearField(this.elements.dialerName);
        await this.type(this.elements.dialerName, dialerRule.dialerName);
    }

    /** 
    * Function to click recycle button
    * @returns {void} nothing
    */
    async clickRecycle(button) {
        let recycleButton = `//div[@class="col col-sm-12"]//span[text()="${button}"]`;
        await this.waitForSelector(recycleButton);
        await this.click(recycleButton);
    }

    /** 
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

    /** 
    * Function to update dialer Control settings
    * @param {object} - settings
    * @param {string} - settings.campaign - campaign
    * @param {string} - settings.ratio - ratio
    * @param {string} - settings.sortContactsPriority - sortContactsPriority
    * @returns {void} nothing
    */
    async updateDialerControlSettings(settings) {
        // need to wait to option to load
        await this.wait(5);
        await this.dropdownOptionSelect(
            this.elements.dialerControlOutboundCampaign,
            settings.campaign
        );
        let ratio = `[data-ratio="${settings.ratio}"]`;
        if (await this.isVisible(ratio)) {
            await this.click(ratio);
        };
        let locator = `//label[@class="radio-inline"]//span[text()="${settings.sortContactsPriority}"]`;
        await this.click(locator);
    }

    /** 
    * Function to click previously created database
    * @param {object} - databaseName
    * @returns {void} nothing
    */
    async clickPreviousDatabase(databaseName) {
        await this.wait(3); //Require time to load the fields
        await this.waitForSelector(this.elements.searchDatabase);
        await this.forceClick(this.elements.searchDatabase);
        await this.type(this.elements.searchDatabase, databaseName);
        await this.pressKey('Enter');
        await this.wait(6); //Results take time to get reflected
        await this.waitForSelector(this.elements.dataTable);
        await this.click(this.elements.dataTable);
    }

    /** 
    * Function to validate contacts are closed
    * @returns {void} nothing
    */
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

    /**
    * Function to delete the previously created database
    * @returns {void} nothing
    */
    async deleteDatabase() {
        await this.click(this.elements.deleteDatabase);
        await this.click(this.elements.confirmDeleteDatabase);
        const successDelete = await this.getTexts(this.elements.popUpMsg);
        assert.equal(successDelete, 'Database has been deleted successfully.');
    }
}