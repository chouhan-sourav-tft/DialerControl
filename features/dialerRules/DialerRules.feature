@dialerRules
Feature: Dialer Rules

    @5718
    Scenario: Dialer Rules-Validate all contacts are closed
        Given User login to the platform as 'admin'
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'power'
        Then user go to the 'Dialer rules manager' tab
        And user configure the folllowing rule
            | dialerName | Rule_1 |
        Then user click on the 'Recycle' button
        When user set the following values in the previously added line
            | callOutcome     | Ok |
            | recycleInterval | 4h |
            | maxTries        | 3  |
        And user clicks the finish button
        When Navigate to Database Manager
        And Create Database
            | browseFile                  | databaseCampaign | optionName | optionPhone1 | optionEmail | optionPostal | optionCity |
            | fixtures/DB_GOTEST-6387.csv | 1                | 0          | 1            | 2           | 3            | 4          |
        Then load the database
            | browseFile                  | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 | optionEmail | optionPostal | optionCity |
            | fixtures/DB_GOTEST-6387.csv | 2                    | 1                | 0          | 1            | 2           | 3            | 4          |
        When user navigates to dialer control menu
        Then in dialer control menu choose the following
            | campaign             | OutboundCampaign_1   |
            | sortContactsPriority | By outcome and field |
        And login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        Then validate triggered contact with following information:
            | name    | phone  | email         | postal | city   | outcomeGroup     | outcome |
            | Liliana | 193111 | l@gocontat.pt | 3333   | Lisboa | Call Again Later | Ok      |
        When Navigate to Database Manager
        Then user click the previously created DB
        And user validate that all contacts are closed