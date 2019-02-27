const {Menu} = require('../../../../../../uimap/BO/Menu/menu');
const {AddressesPage} = require('../../../../../../uimap/BO/customers/addresses');
const {DashBoardPage} = require('../../../../../../uimap/BO/dashboard/dashboard');
const {HomePage} = require('../../../../../../uimap/FO/homePage/homePage');
const {AccountPage} = require('../../../../../../uimap/FO/accountPage/accountPage');
const {AuthenticationPageFO} = require('../../../../../../uimap/FO/authentication/authentication');
const authentication = require('../../../../../clients/common_scenarios/authentication');
const customer = require('../../../../../clients/common_scenarios/customer/customer');
const address = require('../../../../../clients/common_scenarios/customer/address');
let faker = require('faker');

let customerData = {
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  email_address: faker.internet.email(),
  password: '1111111',
  birthday: {
    day: '18',//edit with faker
    month: '1',//edit with faker
    year: '1971'//edit with faker
  }
};
let addressData = {
  email: customerData.email_address,
  id_number: faker.random.number(500),
  address_alias: faker.lorem.word(),
  first_name: customerData.first_name,
  last_name: customerData.last_name,
  company: faker.lorem.word(),
  vat_number: faker.random.number(900),
  address: faker.address.streetName(),
  second_address: faker.address.secondaryAddress(),
  ZIP: faker.address.zipCode("#####"),
  city: faker.address.city(),
  country: '8',///edit with faker
  home_phone: faker.phone.phoneNumber("0033######"),
  other: faker.lorem.words()
};

scenario('Create, Edit, delete "Address"', () => {
  authentication.signInBO('address');
  customer.createCustomer(customerData);
  scenario('Edit, delete and delete with bulk actions "Address"', () => {

    scenario('Go to "Addresses" page', client => {
      test('should go to the "Addresses" page', () => client.goToSubtabMenuPage(Menu.Sell.Customers.customers_menu_link, Menu.Sell.Customers.addresses_submenu_link));
      test('should click on "Add new address" button', () => client.waitForAndClick(AddressesPage.addresses_add_new_addresse_link));
    }, 'common_client');

    address.checkAddressRequiredInput(addressData, 'first');
    address.checkAddressBO(addressData);

    scenario('Change the required fields addresses parameter', client => {
      test('should click on "Set required fields for this section" button', () => client.waitForAndClick(AddressesPage.addresses_set_required_fields_link, 1000));
      test('should click on "company" check box button', () => client.waitForAndClick(AddressesPage.addresses_company_checkbox, 1000));
      test('should click on "Save" button', () => client.waitForAndClick(AddressesPage.addresses_save_required_fields_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(AddressesPage.addresses_success_alert, '×\nSuccessful update.'));
    }, 'common_client');

    scenario('Add new address', client => {
      test('should click on "Add new address" button', () => client.waitForAndClick(AddressesPage.addresses_add_new_addresse_link));
    }, 'common_client');

    address.checkAddressRequiredInput(addressData, 'second');

    scenario('Change the required fields addresses parameter', client => {
      test('should click on "Set required fields for this section" button', () => client.waitForAndClick(AddressesPage.addresses_set_required_fields_link));
      test('should check all fields names', () => client.waitForAndClick(AddressesPage.addresses_check_all_required_fields_checkbox));
      test('should click on "Save" button', () => client.waitForAndClick(AddressesPage.addresses_save_required_fields_button));
    }, 'common_client');

    scenario('Add new address', client => {
      test('should click on "Add new address" button', () => client.waitForAndClick(AddressesPage.addresses_add_new_addresse_link));
    }, 'common_client');

    address.checkAddressRequiredInput(addressData, 'allInput');

    scenario('Disable all required field addresses parameter', client => {
      test('should go to the "Addresses" page', () => client.goToSubtabMenuPage(Menu.Sell.Customers.customers_menu_link, Menu.Sell.Customers.addresses_submenu_link));
      test('should click on "Set required fields for this section" button', () => client.waitForAndClick(AddressesPage.addresses_set_required_fields_link));
      test('should disable all fields names', async () => {
        await client.waitForAndClick(AddressesPage.addresses_check_all_required_fields_checkbox);
        await client.waitForAndClick(AddressesPage.addresses_check_all_required_fields_checkbox);
      });
      test('should click on "Save" button', () => client.waitForAndClick(AddressesPage.addresses_save_required_fields_button));
    }, 'common_client');

    scenario('Delete the second address created', client => {
      test('should check the address existence in the "addresses list"', async () => {
        await client.isVisible(AddressesPage.addresses_filter_address_input_field, 1000);
        await client.search(AddressesPage.addresses_filter_address_input_field, addressData.address);
      });
      test('Should click on "Delete" button of the second address', async () => {
        await client.waitForAndClick(AddressesPage.addresses_dropdown_button.replace('%ROW', 1));
        await client.confirmationDialog();
        await client.waitForAndClick(AddressesPage.addresses_delete_link.replace('%ROW', 1));
      });
      test('should get the address ID', () => client.getTextInVar(AddressesPage.addresses_address_column.replace('%ROW', 1).replace('%COL', 2), 'address_id'));
    }, 'common_client');
  }, 'common_client');

  scenario('Edit address', client => {
    scenario('Check customer address in the Front Office', client => {
      test('should open the Front Office in new window', () => client.accessToFO(DashBoardPage.dashboard_view_my_shop_link, 1));
      test('should set the shop language to "English"', () => client.switchShopLanguageInFo('en'));
      test('should click on "sign in" button', () => client.waitForAndClick(HomePage.sign_in_button));
      test('should set the "Email" input', () => client.waitForAndSetValue(AuthenticationPageFO.email_input, customerData.email_address));
      test('should set the "Password" input', () => client.waitForAndSetValue(AuthenticationPageFO.password_input, customerData.password));
      test('should click on "Sign In" button', () => client.waitForAndClick(AuthenticationPageFO.login_button));
      test('should click on "Addresses" button', () => client.waitForAndClick(AccountPage.address_link));
      test('should check "Address" information', async () => {
        await client.checkTextValue(AccountPage.address_information.replace('%ID', global.tab['address_id']), addressData.first_name + " " + addressData.last_name, "contain");
        await client.checkTextValue(AccountPage.address_information.replace('%ID', global.tab['address_id']), addressData.company, "contain");
        await client.checkTextValue(AccountPage.address_information.replace('%ID', global.tab['address_id']), addressData.address, "contain");
        await client.checkTextValue(AccountPage.address_information.replace('%ID', global.tab['address_id']), addressData.second_address, "contain");
        await client.checkTextValue(AccountPage.address_information.replace('%ID', global.tab['address_id']), addressData.ZIP + " " + addressData.city, "contain");
        await client.switchWindow(0);
      });
      address.editAddress(addressData);
    }, 'common_client');

    scenario('Check the edited address in the Front Office', client => {
      test('should go to the Front Office and refresh the page', async () => {
        await client.switchWindow(1);
        await client.reload();
      });
      test('should check "Address" informations', async () => {
        await client.checkTextValue(AccountPage.address_information.replace('%ID', global.tab['address_id']), addressData.first_name + " " + addressData.last_name, "contain");
        await client.checkTextValue(AccountPage.address_information.replace('%ID', global.tab['address_id']), addressData.company, "contain");
        await client.checkTextValue(AccountPage.address_information.replace('%ID', global.tab['address_id']), addressData.address, "contain");
        await client.checkTextValue(AccountPage.address_information.replace('%ID', global.tab['address_id']), addressData.second_address, "contain");
        await client.checkTextValue(AccountPage.address_information.replace('%ID', global.tab['address_id']), addressData.ZIP + " " + addressData.city, "contain");
        await client.switchWindow(0);
      });
    }, 'common_client');
  }, 'common_client');

  scenario('Delete address', client => {
    address.deleteAddress(addressData);
    scenario('Check that no results appear', client => {
      test('should Check that no results appear', () => client.isExisting(AddressesPage.addresses_empty_bloc));
    }, 'common_client');
    scenario('Check the deleted address in the Front Office', client => {
      test('should check that the address has been deleted in the Front Office', async () => {
        await client.switchWindow(1);
        await client.reload();
      });
      test('should Check that no results appear', async () => {
        await client.checkTextValue(AccountPage.addresses_warning, 'No addresses are available.', "contain");
        await client.switchWindow(0);
      });
    }, 'common_client');
  }, 'common_client');

  scenario('Delete address with bulk actions', client => {
    address.createAddress(addressData, customerData);
    address.checkAddressBO(addressData);


    scenario('Get the address ID', client => {
      test('should get the address ID', () => client.getTextInVar(AddressesPage.addresses_address_column.replace('%ROW', 1).replace('%COL', 2), 'address_id'));
    }, 'common_client');

    scenario('Check the created address in the Front Office', client => {
      test('should check that the address has been created in the Front Office', async () => {
        await client.switchWindow(1);
        await client.reload();
      });
      test('should check "Address" information', async () => {
        await client.checkTextValue(AccountPage.address_information.replace('%ID', global.tab['address_id']), addressData.first_name + " " + addressData.last_name, "contain");
        await client.checkTextValue(AccountPage.address_information.replace('%ID', global.tab['address_id']), addressData.company, "contain");
        await client.checkTextValue(AccountPage.address_information.replace('%ID', global.tab['address_id']), addressData.address, "contain");
        await client.checkTextValue(AccountPage.address_information.replace('%ID', global.tab['address_id']), addressData.second_address, "contain");
        await client.checkTextValue(AccountPage.address_information.replace('%ID', global.tab['address_id']), addressData.ZIP + " " + addressData.city, "contain");
        await client.switchWindow(0);
      });
    }, 'common_client');

    address.deleteAddressWithBulkActions(addressData);

    scenario('Check the deleted address in the Front Office', client => {
      test('should check that the address has been deleted in the Front Office', async () => {
        await client.switchWindow(1);
        await client.reload();
      });
      test('should Check that no results appear', async () => {
        await client.checkTextValue(AccountPage.addresses_warning, 'No addresses are available.', "contain");
        await client.switchWindow(0);
      });
    }, 'common_client');
  }, 'common_client');

  authentication.signOutBO();
}, 'common_client', true);
