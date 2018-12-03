let CommonClient = require('../../common_client');

class Module extends CommonClient {

  async getModuleButtonName(ModulePage, moduleTechName) {
    let selector = await ModulePage.module_manager_different_action_link.split('%moduleTechName').join(moduleTechName);
    await page.$eval(selector, (el) => el.innerText).then((buttonText) => {
      global.buttonText = buttonText;
    });
  }

  async clickOnConfigureModuleButton(ModulePage, moduleTechName) {
    if (buttonText === "Configure")
      return await this.waitForAndClick(ModulePage.module_manager_configure_module_link.replace('%moduleTechName', moduleTechName));
    else {
      await this.waitForAndClick(ModulePage.module_manager_action_dropdown_button.replace('%moduleTechName', moduleTechName));
      await this.waitForAndClick(ModulePage.module_manager_configure_module_link.replace('%moduleTechName', moduleTechName));
    }
  }

  async clickOnEnableModuleButton(ModulePage, moduleTechName) {
    if (buttonText === "Enable") {
      await this.waitForAndClick(ModulePage.module_manager_enable_module_link.split('%moduleTechName').join(moduleTechName), 2000)
    } else if (buttonText === "Disable" || buttonText === "Configure")
      await this.waitFor(1000);
    else {
      await this.waitForAndClick(ModulePage.module_manager_action_dropdown_button.replace('%moduleTechName', moduleTechName), 2000);
      await this.waitForAndClick(ModulePage.module_manager_enable_module_link.split('%moduleTechName').join(moduleTechName), 3000);
    }
  }

  async clickOnDisableModuleButton(ModulePage, moduleTechName) {
    if (buttonText === "Disable") {
      await this.waitForAndClick(ModulePage.module_manager_disable_module_link.split('%moduleTechName').join(moduleTechName))
    }
    else if (buttonText === "Enable")
      await this.waitFor(1000);
    else {
      await this.waitForAndClick(ModulePage.module_manager_action_dropdown_button.replace('%moduleTechName', moduleTechName));
      await this.waitForAndClick(ModulePage.module_manager_disable_module_link.split('%moduleTechName').join(moduleTechName), 3000);
    }
  }
}

module.exports = Module;