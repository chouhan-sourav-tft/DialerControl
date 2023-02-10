@dialerRules
Feature: Dialer Rules

    @5718
    Scenario: Dialer Rules-Validate all contacts are closed
        Given User login to the platform as 'admin'
        Then clean active calls
        And user delete the stored database
        When user navigate to callbacks manager
        And user delete all scheduled callback
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'power-preview'
        Then user go to the 'Dialer rules manager' tab
        And user configure the folllowing rule
            | dialerName | Rule_1 |
        Then user click on the 'Recycle' button
        When user set the following values in the previously added line
            | callOutcome     | Block |
            | recycleInterval | 4h    |
            | maxTries        | 3     |
        And user clicks the finish button
        When Navigate to Database Manager
        And Create Database
            | browseFile            | databaseCampaign | optionName | optionPhone1 |
            | fixtures/database.csv | 1                | 0          | 1            |
        Then load the database
            | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | fixtures/database.csv | 1                    | 1                | 0          | 1            |
        When user navigates to dialer control menu
        Then in dialer control menu choose the following
            | campaign             | OutboundCampaign_1   |
            | sortContactsPriority | By outcome and field |
            | ratio                | 1                    |
        And login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        Then verify all contacts loaded in the database are triggered by the dialer
            | number       | 910261828        |
            | outcomeGroup | Call Again Later |
            | outcomeName  | Ok               |
        When Navigate to Database Manager
        Then user click the previously created DB
            | databaseCampaign | optionName | optionPhone1 | databaseIndex |
            | 1                | 0          | 1            | 0             |
        And user validate that all contacts are closed

    @5720
    Scenario: Dialer Rules- invalid contacts
        Given User login to the platform as 'admin'
        Then clean active calls
        And user delete the stored database
        When user navigate to callbacks manager
        And user delete all scheduled callback
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'power-preview'
        Then user go to the 'Dialer rules manager' tab
        And user configure the folllowing rule
            | dialerName | Rule_1 |
        Then user click on the 'Recycle' button
        When user set the following values in the previously added line
            | callOutcome     | Block |
            | recycleInterval | 4h    |
            | maxTries        | 3     |
        And user clicks the finish button
        When Navigate to Database Manager
        And Create Database
            | browseFile            | databaseCampaign | optionName | optionPhone1 |
            | fixtures/invalid.csv  | 1                | 0          | 1            |
        Then load the database
            | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | fixtures/invalid.csv  | 1                    | 1                | 0          | 1            |
        When user navigates to dialer control menu
        Then in dialer control menu choose the following
            | campaign             | OutboundCampaign_1   |
            | sortContactsPriority | By outcome and field |
        And login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        Then verify all contacts loaded in the database are triggered
            | number       | 999999999        |
            | outcomeGroup | Call Again Later |
            | outcomeName  | Ok               |
        When Navigate to Database Manager
        Then user click the previously created DB
            | databaseCampaign | optionName | optionPhone1 | databaseIndex |
            | 1                | 0          | 1            | 0             |
        And user validate that all contacts are closed