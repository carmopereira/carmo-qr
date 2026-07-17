<?php
/**
 * Plugin Name:       Carmo Qr
 * Description:       Interactive QR code generator block. Visitors enter a URL and get a downloadable SVG QR code with color theme support.
 * Version:           0.1.12
 * Requires at least: 6.9
 * Requires PHP:      8.2
 * Author:            João Carmo Pereira
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       carmo-qr
 *
 * @package CarmoQr
 */

declare(strict_types=1);

namespace CarmoQr;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Bootstraps the plugin: registers the block(s) metadata from the
 * `blocks-manifest.php` and registers the block type(s) based on the
 * registered block metadata. Behind the scenes, it registers also all
 * assets so they can be enqueued through the block editor in the
 * corresponding context.
 *
 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
 */
final class Plugin {

	public static function init(): void {
		add_action( 'init', array( self::class, 'register_blocks' ) );
	}

	public static function register_blocks(): void {
		wp_register_block_types_from_metadata_collection(
			__DIR__ . '/build',
			__DIR__ . '/build/blocks-manifest.php'
		);
	}
}

Plugin::init();
