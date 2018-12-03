module.exports = {
  ProductPage: {
    ProductList: {
      add_new_button: '#page-header-desc-configuration-add',
      filter_input: '#product_catalog_list  thead[class="with-filters"] input[name="filter_column_%NAME"]',
      submit_filter_button: '#product_catalog_list  thead[class="with-filters"] button[name="products_filter_submit"]',
      searched_product_link: '#product_catalog_list td:nth-child(4) > a',
      reset_filter_button: '#product_catalog_list  thead[class="with-filters"] button[name="products_filter_reset"]',
      tools_button: '#catalog-tools-button',
      import_button: '#desc-product-import',
      filter_by_categories_button: '#product_catalog_category_tree_filter',
      home_category_radio_button: '#product_categories_categories > ul > li > div input',
      unselect_button: '#product_catalog_category_tree_filter_reset',
      product_table: '#product_catalog_list table.product',
      get product_checkbox_button() {
        return this.product_table + ' tbody tr:nth-child(%ID) td:nth-child(1)';
      },
      get product_checkbox_input() {
        return this.product_table + ' tbody tr:nth-child(%ID) td:nth-child(1) input';
      },
      get product_id() {
        return this.product_table + ' tbody tr:nth-child(%ID) td:nth-child(2) > label';
      },
      get products_calatogue_product_name_column() { //@TODO
        return this.product_table + ' tbody tr:nth-child(%ID) td:nth-child(4) a';
      },
      get products_calatogue_product_reference_column() {  //@TODO
        return this.product_table + ' tbody tr:nth-child(%ID) td:nth-child(5)';
      },
      get products_calatogue_product_category_column() {  //@TODO
        return this.product_table + ' tbody tr:nth-child(%ID) td:nth-child(6)';
      },
      get products_calatogue_product_price_column() {  //@TODO
        return this.product_table + ' tbody tr:nth-child(%ID) td:nth-child(7) a';
      },
      get products_calatogue_product_quantity_column() {  //@TODO
        return this.product_table + ' tbody tr:nth-child(%ID) td:nth-child(8) a';
      },
      get product_status() {  //@TODO
        return this.product_table + ' tbody tr:nth-child(%ID) td:nth-child(8) a';
      },
      get products_calatogue_product_online_column() {  //@TODO
        return this.product_table + ' tbody tr:nth-child(%ID) td:nth-child(9) a';
      },
      get products_search_name_input_field() { //@TODO
        return this.product_table + ' input[name="filter_column_name"]';
      },
      get product_filter_reference_input() {
        return this.product_table + ' input[name="filter_column_reference"]';
      },
      get product_filter_category_input() {
        return this.product_table + ' input[name="filter_column_name_category"]';
      },
      get products_search_button() { //@TODO
        return this.product_table + ' button[name="products_filter_submit"]';
      },
      get products_reset_button() {
        return this.product_table + ' button[name="products_filter_reset"]'; //@TODO
      },
      get product_filter_reorder_button() {
        return this.product_table + ' input[value="Reorder"]';
      },
      get product_filter_save_refresh_button() {
        return '#bulk_edition_save_keep';
      },
      success_message: 'div.alert-success div.alert-text',
      success_close_button: 'div.alert-success button.close'
    },
    AddProduct: {
      quantity_combination_tab: '#tab_step3 > a',
      options_tab: '#tab_step6 > a',
      success_message: '#growls-default div.growl-message',
      save_button: 'button.js-btn-save[type=submit]',
      online_switcher: '.switch-input',
      symfony_toolbar: 'a[title="Close Toolbar"]',
      close_validation_button: '.growl-close',
      validation_msg: '#growls-default > .growl-notice > .growl-message:not(:empty)',
      preview_button: '#product_form_preview_btn',
      preview_link: 'body > a',

      Basic_settings: {
        name_input: '#form_step1_name_1',
        combination_radio_button: '#show_variations_selector > div:nth-child(3) > label > input[type="radio"]',
        simple_product_radio_button: '#show_variations_selector > div:nth-child(2) > label input',
        reference_input: '#form_step6_reference',
        quantity_input: '#form_step1_qty_0_shortcut',
        price_input: '#form_step1_price_shortcut',
        files_input: 'input.dz-hidden-input[type="file"]',
        add_feature_button: '#add_feature_button',
        feature_select_button: '#select2-form_step1_features_%ID_feature-container',
        feature_select_option: '#select2-form_step1_features_%ID_feature-results li:nth-child(%OPTION)',
        predefined_value_select: '#form_step1_features_%ID_value:not(disabled)'
      },

      Combination: {
        attributes_input: '#form_step3_attributes-tokenfield',
        first_attribute_select: '#attributes-generator div.tt-dataset  div:nth-child(1)',
        generate_combination_button: '#create-combinations',
        attribute_quantity_input: '#accordion_combinations > tr:nth-child(%NUMBER) > td.attribute-quantity  input',
        attribute_size_checkbox_button: '#attribute-group-1 div.attribute:nth-child(%ID) span',
        combination_tr: '#accordion_combinations > tr:nth-child(%POS)',
        edit_combination_icon: '#attribute_%ID > td.attribute-actions a',
        combination_image: '#combination_%ID_id_image_attr > div:nth-child(%POS) > img',
        combination_image_number: '#combination_form_%ID small.number-of-images'
      },

      Quantity: {
        default_behaviour_radio_button: '#form_step3_out_of_stock_2',
        minimal_quantity_input: '#form_step3_minimal_quantity'
      },

      Options: {
        add_customization_button: '#custom_fields > a',
        customization_input: '#form_step6_custom_fields_0_label_1',
        attach_new_file_button: '#step6 a.mb-3',
        attachment_file: '#form_step6_attachment_product_file'
      }
    }
  }
}