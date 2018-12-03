const {Menu} = require('../../../../uimap/BO/menu/menu');

module.exports = {
  checkConfigPage: function (client, ModuleCatalogPage,  ModuleManagerPage, moduleTechName) {
    test('should click on "Configure" button', async () => {
      await client.getModuleButtonName(ModuleManagerPage, moduleTechName);
      await client.clickOnConfigureModuleButton(ModuleManagerPage, moduleTechName);
    });
    test('should check the configuration page', () => client.checkTextValue(ModuleManagerPage.module_manager_module_techname_label, moduleTechName));
  },
  installModule: function (client, ModuleCatalogPage,  ModuleManagerPage, AddProductPage, moduleTechName) {
    test('should go to "Module Catalog" page', async () => {
      await client.waitForAndClick(Menu.Improve.Modules.modules_menu_link);
      await client.waitForAndClick(Menu.Improve.Modules.module_catalog_submenu_link);
    });
    test('should click on "Module Catalog" tab', () => client.waitForAndClick(Menu.Improve.Modules.selection_tab));
    /****** Should clear the input before editing the input value *****/
    test('should set the name of the module in the search input', () => client.clearInputAndSetValue(ModuleCatalogPage.module_catalog_search_input_field, moduleTechName, 2000));
    test('should click on "Search" button', () => client.waitForAndClick(ModuleCatalogPage.module_catalog_search_module_button, 2000));
    test('should click on "Install" button', async () => {
      await client.waitForAndClick(ModuleCatalogPage.module_catalog_install_button.replace("%moduleTechName", moduleTechName), 2000)
    });
    test('should check that the success alert message is well displayed', async () => await client.waitForAndClick(AddProductPage.close_validation_button));
    test('should go to "Module Manager" page', () => client.waitForAndClick(Menu.Improve.Modules.module_manager_submenu_link));
    test('should click on "Modules" tab', () => client.waitForAndClick(ModuleManagerPage.module_manager_modules_tab));
    test('should set the name of the module in the search input', () => client.clearInputAndSetValue(ModuleCatalogPage.module_catalog_search_input_field, moduleTechName, 3000));
    test('should click on "Search" button', () => client.waitForAndClick(ModuleManagerPage.module_manager_search_module_button));
    test('should check if the module ' + moduleTechName + ' was installed', () => client.isExisting(ModuleManagerPage.module_manager_installed_module_bloc.replace('%moduleTechName', moduleTechName)), 2000);
  },
  disableModule: function (client, ModuleCatalogPage,  ModuleManagerPage, AddProductPage, moduleTechName) {
    test('should go to "Module" page', async () => {
      await client.waitForAndClick(Menu.Improve.Modules.module_manager_submenu_link);
    });
    test('should click on "Installed Modules"', () => client.waitForAndClick(Menu.Improve.Modules.installed_modules_tabs));
    test('should search for ' + moduleTechName + ' module in the installed module tab', () => client.clearInputAndSetValue(ModuleManagerPage.module_manager_search_input_field, moduleTechName, 2000));
    test('should click on "Search" button', () => client.waitForAndClick(ModuleManagerPage.module_manager_search_module_button));
    test('should click on "Disable" button', async () => {
      await client.getModuleButtonName(ModuleManagerPage, moduleTechName);
      await client.clickOnDisableModuleButton(ModuleManagerPage, moduleTechName);
    });
    test('should click on "Yes, disable it" button', async () => {
      await client.confirmationDialog();
      await client.waitForAndClick(ModuleManagerPage.module_manager_disable_it_button, 2000)
    });
    test('should check that the success alert message is well displayed', () => client.waitForAndClick(AddProductPage.close_validation_button));
  },
  enableModule: function (client, ModuleCatalogPage,  ModuleManagerPage, AddProductPage, moduleTechName) {
    test('should go to "Module" page', async () => {
      await client.waitForAndClick(Menu.Improve.Modules.module_manager_submenu_link);
    });
    test('should click on "Installed Modules"', () => client.waitForAndClick(Menu.Improve.Modules.installed_modules_tabs));
    test('should search for ' + moduleTechName + ' module in the installed module tab', () => client.clearInputAndSetValue(ModuleManagerPage.module_manager_search_input_field, moduleTechName, 2000));
    test('should click on "Search" button', () => client.waitForAndClick(ModuleManagerPage.module_manager_search_module_button));
    test('should click on "Enable" button', async () => {
      await client.getModuleButtonName(ModuleManagerPage, moduleTechName);
      await client.clickOnEnableModuleButton(ModuleManagerPage, moduleTechName);
    });
    test('should check that the success alert message is well displayed', () => client.waitForAndClick(AddProductPage.close_validation_button, 1000));
  },
  uninstallModule: function (client, ModuleCatalogPage,  ModuleManagerPage, AddProductPage, moduleTechName) {
    test('should go to "Module" page', async () => {
      await client.waitForAndClick(Menu.Improve.Modules.modules_menu_link);
      await client.waitForAndClick(Menu.Improve.Modules.module_manager_submenu_link);
    });
    test('should click on "Installed Modules"', () => client.waitForAndClick(Menu.Improve.Modules.installed_modules_tabs));
    test('should search for ' + moduleTechName + ' module in the installed module tab', () => client.clearInputAndSetValue(ModuleManagerPage.module_manager_search_input_field, moduleTechName, 2000));
    test('should click on "Search" button', () => client.waitForAndClick(ModuleManagerPage.module_manager_search_module_button));
    test('should click on module dropdown', async () => {
      await client.scrollIntoView(ModuleManagerPage.module_manager_action_dropdown_button.replace('%moduleTechName', moduleTechName));
      await client.waitForAndClick(ModuleManagerPage.module_manager_action_dropdown_button.replace('%moduleTechName', moduleTechName));
    });
    test('should click on "Uninstall" button', async () => {
      await client.scrollIntoView(ModuleManagerPage.module_manager_uninstall_module_button.split('%moduleTechName').join(moduleTechName));
      await client.waitForAndClick(ModuleManagerPage.module_manager_uninstall_module_button.split('%moduleTechName').join(moduleTechName));
    });
    test('should click on "Yes, uninstall it" button', async () => {
      await client.confirmationDialog();
      await client.waitForAndClick(ModuleManagerPage.module_manager_uninstall_it_button, 2000)
    });
    test('should check that the success alert message is well displayed', () => client.waitForAndClick(AddProductPage.close_validation_button));
    test('should check that the backdrop is hidden', () => client.checkIsNotVisible(ModuleManagerPage.module_manager_actions_modal));
    test('should check if the module ' + moduleTechName + ' was uninstalled', () => client.isNotExisting(ModuleManagerPage.module_manager_installed_module_bloc.replace('%moduleTechName', moduleTechName)));
  },
  checkMboModule: async function (client, ModuleCatalogPage,  ModuleManagerPage, AddProductPage, moduleTechName, action) {
    if (action === 'Uninstall') {
      test('should go to "Module" page', async () => {
        await client.waitForAndClick(Menu.Improve.Modules.modules_menu_link);
        await client.waitForAndClick(Menu.Improve.Modules.module_manager_submenu_link);
      });
      test('should click on "Installed Modules"', () => client.waitForAndClick(Menu.Improve.Modules.installed_modules_tabs));
      test('should search for ' + moduleTechName + ' module in the installed module tab', () => client.clearInputAndSetValue(ModuleManagerPage.module_manager_search_input_field, moduleTechName, 2000));
      test('should click on "Search" button', () => client.waitForAndClick(ModuleManagerPage.module_manager_search_module_button));
      test('should check if the module ' + moduleTechName + ' was installed', () => client.isVisible(ModuleManagerPage.module_manager_installed_module_bloc.replace('%moduleTechName', moduleTechName), 2000));
      test('should click on "Uninstall" button', async () => {
        if (visible) {
          await client.scrollIntoView(ModuleManagerPage.module_manager_action_dropdown_button.replace('%moduleTechName', moduleTechName));
          await client.waitForAndClick(ModuleManagerPage.module_manager_action_dropdown_button.replace('%moduleTechName', moduleTechName));
          await client.scrollIntoView(ModuleManagerPage.module_manager_uninstall_module_button.split('%moduleTechName').join(moduleTechName));
          await client.waitForAndClick(ModuleManagerPage.module_manager_uninstall_module_button.split('%moduleTechName').join(moduleTechName));
          await client.confirmationDialog();
          await client.waitForAndClick(ModuleManagerPage.module_manager_uninstall_it_button, 2000);
          await client.waitForAndClick(AddProductPage.close_validation_button);
          await client.checkIsNotVisible(ModuleManagerPage.module_manager_actions_modal);
          await client.isNotExisting(ModuleManagerPage.module_manager_installed_module_bloc.replace('%moduleTechName', moduleTechName))
        }
      });
      test('should go to the "Dashboard"', () => client.waitForAndClick(Menu.dashboard_menu_list));
    }
    else {
      test('should go to "Module Catalog" page', async () => {
        await client.waitForAndClick(Menu.Improve.Modules.modules_menu_link);
        await client.waitForAndClick(Menu.Improve.Modules.module_catalog_submenu_link);
      });
      /****** Should clear the input before editing the input value *****/
      test('should set the name of the module in the search input', () => client.clearInputAndSetValue(ModuleCatalogPage.module_catalog_search_input_field, moduleTechName, 2000));
      test('should click on "Search" button', () => client.waitForAndClick(ModuleCatalogPage.module_catalog_search_module_button, 2000));
      test('should check if the module ' + moduleTechName + ' is existing', () => client.isVisible(ModuleCatalogPage.module_catalog_install_button.replace("%moduleTechName", moduleTechName), 2000));
      test('should install "" module', async () => {
        if (visible) {
          await client.waitForAndClick(ModuleCatalogPage.module_catalog_install_button.replace("%moduleTechName", moduleTechName), 2000);
          await client.waitForAndClick(AddProductPage.close_validation_button);
          await client.waitForAndClick(Menu.Improve.Modules.module_manager_submenu_link);
          await client.waitForAndClick(ModuleManagerPage.module_manager_modules_tab);
          await client.clearInputAndSetValue(ModuleCatalogPage.module_catalog_search_input_field, moduleTechName, 3000);
          await client.waitForAndClick(ModuleManagerPage.module_manager_search_module_button);
          await client.isExisting(ModuleManagerPage.module_manager_installed_module_bloc.replace('%moduleTechName', moduleTechName), 2000);
        }
      });
    }
  },
};
