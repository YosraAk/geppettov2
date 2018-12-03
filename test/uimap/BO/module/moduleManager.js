module.exports = {
  ModuleManagerPage: {
    module_manager_modules_tab: '#subtab-AdminModulesManage',
    module_manager_search_module_button: '#module-search-button',
    module_manager_installed_module_bloc: 'div[data-tech-name="%moduleTechName"]', //@TODO
    module_manager_module_techname_label: '#content > div:nth-child(7) ul[class*="page-breadcrumb"] > li:nth-child(2)', //@TODO
    module_manager_different_action_link: 'div[data-tech-name="%moduleTechName"] div[class*="module-actions"] > a , div[data-tech-name="%moduleTechName"] form > button[data-confirm_modal="module-modal-confirm-%moduleTechName-enable"]', //@TODO
    module_manager_configure_module_link: '#main-div div[data-tech-name="%moduleTechName"] a[href*="/action/configure"]',  //@TODO
    module_manager_action_dropdown_button: 'div[data-tech-name="%moduleTechName"] button[class*="dropdown-toggle"]',  //@TODO
    module_manager_search_input_field: '.pstaggerAddTagInput', //@TODO
    module_manager_disable_it_button: 'a[class*="module_action_modal_disable"]',  //@TODO
    module_manager_enable_module_link: 'form[action*="action/enable/%moduleTechName"] button[data-confirm_modal="module-modal-confirm-%moduleTechName-enable"]',  //@TODO
    module_manager_disable_module_link: 'form[action*="action/disable/%moduleTechName"] button[data-confirm_modal="module-modal-confirm-%moduleTechName-disable"]', //@TODO
    module_manager_uninstall_module_button: 'form[action*="action/uninstall/%moduleTechName"] button[data-confirm_modal="module-modal-confirm-%moduleTechName-uninstall"]', //@TODO
    module_manager_uninstall_it_button: 'a[class*="module_action_modal_uninstall"]',  //@TODO
    module_manager_actions_modal: '#module-modal-confirm-statsnewsletter-uninstall',
  },
};

