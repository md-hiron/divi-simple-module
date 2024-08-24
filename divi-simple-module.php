<?php
/*
Plugin Name: Divi 5 Simple Module
Plugin URI:
Description: Plugin reference for creating simple and quick Divi 5 Module.
Version:     1.0.0
Author:      Elegant Themes
Author URI:  https://elegantthemes.com
License:     GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
*/

if ( ! defined( 'ABSPATH' ) ) {
  die( 'Direct access forbidden.' );
}

// Setup constants.
define( 'DIVI_SIMPLE_MODULE_PATH', plugin_dir_path( __FILE__ ) );
define( 'DIVI_SIMPLE_MODULE_URL', plugin_dir_url( __FILE__ ) );

// Load Divi 5 modules.
require_once DIVI_SIMPLE_MODULE_PATH . 'server/index.php';

/**
 * Enqueue Divi 5 Visual Builder Assets
 */
function divi_simple_module_enqueue_visual_builder_assets() {
  if ( et_core_is_fb_enabled() && et_builder_d5_enabled() ) {
    wp_enqueue_script(
      'divi-simple-module-visual-builder',
      DIVI_SIMPLE_MODULE_URL . 'visual-builder/build/divi-simple-module.js',
      [
        'react',
        'jquery',
        'divi-module-library',
        'wp-hooks',
        'divi-rest',
      ],
      '1.0.0',
      true
    );
  }
}

add_action( 'divi_visual_builder_assets_before_enqueue_packages', 'divi_simple_module_enqueue_visual_builder_assets' );