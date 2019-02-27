const {AccountPage} = require('../../../../../../uimap/FO/accountPage/accountPage');
const {HomePage} = require('../../../../../../uimap/FO/homePage/homePage');
const {AuthenticationPageFO} = require('../../../../../../uimap/FO/authentication/authentication');
const authentication = require('../../../../../clients/common_scenarios/authentication');
let faker = require('faker');

let customerData = {
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  email_address: faker.internet.email(),
  password: '1111111',
};
let addressData = {
  address: faker.address.streetName(),
  ZIP: faker.address.zipCode("#####"),
  city: faker.address.city(),
};

scenario('Create a customer in the Front Office', () => {
  authentication.openShop('customer');

  scenario('Create a customer account in the Front Office', client => {
    test('should change the Front Office language to "English"', () => client.switchShopLanguageInFo('en'));
    test('should click on the "Sign in" link', () => client.waitForAndClick(HomePage.sign_in_button));
    test('should click on "No account? Create one here" link', () => client.waitForAndClick(AccountPage.click_no_account));
    test('should choose a "Social title" option', () => client.waitForAndClick(AccountPage.gender_radio_button));
    test('should set the "First name" input', () => client.waitForAndSetValue(AccountPage.first_name_input, customerData.first_name));
    test('should set the "Last name" input', () => client.waitForAndSetValue(AccountPage.last_name_input, customerData.last_name));
    test('should set the "Email" input', () => client.waitForAndSetValue(AccountPage.email_address_input, customerData.email_address));
    test('should set the "Password" input', () => client.waitForAndSetValue(AccountPage.password_input, customerData.password));
    test('should click on "Save" button', () => client.waitForAndClick(AccountPage.save_button));
  }, 'common_client');

  authentication.signOutFO();
  scenario('Check the creation of customer account', client => {
    test('should change the Front Office language to "English"', () => client.switchShopLanguageInFo('en'));
    test('should login successfully with the created account', () => client.waitForAndClick(HomePage.sign_in_button));
    test('should set the "Email" input', () => client.waitForAndSetValue(AuthenticationPageFO.email_input, customerData.email_address));
    test('should set the "Password" input', () => client.waitForAndSetValue(AuthenticationPageFO.password_input, customerData.password));
    test('should click on "SIGN IN" button', () => client.waitForAndClick(AuthenticationPageFO.login_button));
  }, 'common_client');

  scenario('Create "Address"', client => {
    test('should click on "ADD FIRST ADDRESS" button', () => client.waitForAndClick(AccountPage.add_first_address_link));
    test('should set the "Address" input', () => client.waitForAndSetValue(AccountPage.adr_address, addressData.address));
    test('should set the "Zip/Postal Code" input', () => client.waitForAndSetValue(AccountPage.adr_postcode, addressData.ZIP));
    test('should set the "City" input', () => client.waitForAndSetValue(AccountPage.adr_city, addressData.city));
    test('should click on "SAVE" button', () => client.waitForAndClick(AccountPage.adr_save));
    test('should check that the success alert message is well displayed', () => client.checkTextValue(AccountPage.save_notification, 'Address successfully added!'));
  }, 'common_client');

  scenario('Check the creation of the address', client => {
    test('should click on "update" link', () => client.waitForAndClick(AccountPage.adr_update));
    test('should check that the "First name" of customer', () => client.checkAttributeValue(AccountPage.first_name_input, 'value', customerData.first_name, 'equal', 1000));
    test('should check that the "Last name" of customer', () => client.checkAttributeValue(AccountPage.last_name_input, 'value', customerData.last_name));
    test('should check that the "Address" of customer', () => client.checkAttributeValue(AccountPage.adr_address, 'value', addressData.address));
    test('should check that the "Zip/Postal Code" of customer', () => client.checkAttributeValue(AccountPage.adr_postcode, 'value', addressData.ZIP));
    test('should check that the "City" of customer', () => client.checkAttributeValue(AccountPage.adr_city, 'value', addressData.city));
    test('should go back to the home page', () => client.waitForAndClick(HomePage.logo_home_page));
  }, 'common_client');
  authentication.signOutFO();
}, 'common_client', true);