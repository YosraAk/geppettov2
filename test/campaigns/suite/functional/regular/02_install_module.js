const {ModuleCatalogPage} = require('../../../../uimap/BO/module/moduleCatalog');
const {ModuleManagerPage} = require('../../../../uimap/BO/module/moduleManager');
const {ProductPage} = require('../../../../uimap/BO/catalog/products');
const moduleScenarios = require('../../../clients/common_scenarios/module/module');
const preston = require('../../../clients/common_scenarios/preston/preston');
const authentication = require('../../../clients/common_scenarios/authentication/authentication');

/**
 * If there is no module to install, return immediately.
 */
if (global.test_addons) {
  return;
}

scenario('Install and Uninstall Module from cross selling', () => {
  authentication.signInBO('installModule');
  preston.closeOnBoardingModal();
  scenario('Check then uninstall "ps_mbo" module', client => {
    moduleScenarios.checkMboModule(client, ModuleCatalogPage,  ModuleManagerPage, ProductPage.AddProduct, "ps_mbo", "Uninstall");
  }, 'module/module/module');

  scenario('Install "' + module_tech_name + '" From Cross selling', client => {
    moduleScenarios.installModule(client, ModuleCatalogPage,  ModuleManagerPage, ProductPage.AddProduct, module_tech_name);
  }, 'module/module/module');
  scenario('Check Configuration page of "' + module_tech_name + '"', client => {
    moduleScenarios.checkConfigPage(client, ModuleCatalogPage,  ModuleManagerPage, module_tech_name);
  }, 'module/module/module');
  scenario('Disable Module "' + module_tech_name + '"', client => {
    moduleScenarios.disableModule(client, ModuleCatalogPage,  ModuleManagerPage, ProductPage.AddProduct, module_tech_name);
  }, 'module/module/module');
  scenario('Disable Module "' + module_tech_name + '"', client => {
    moduleScenarios.enableModule(client, ModuleCatalogPage,  ModuleManagerPage, ProductPage.AddProduct, module_tech_name);
  }, 'module/module/module');
  scenario('Uninstall "' + module_tech_name + '"', client => {
    moduleScenarios.uninstallModule(client, ModuleCatalogPage,  ModuleManagerPage, ProductPage.AddProduct, module_tech_name);
  }, 'module/module/module');
  scenario('Check then install  "ps_mbo" module', client => {
    moduleScenarios.checkMboModule(client, ModuleCatalogPage,  ModuleManagerPage, ProductPage.AddProduct, "ps_mbo", "Install");
  }, 'module/module/module');
}, 'module/module/module', true);
