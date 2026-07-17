=== Carmo Qr ===
Contributors:      carmopereira
Tags:              block, qr code, svg, interactivity api
Requires at least: 6.9
Tested up to:      6.9
Requires PHP:      8.2
Stable tag: 0.1.12
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

Interactive QR code generator block. Visitors enter a URL and get a downloadable SVG QR code with color theme support.

== Description ==

Carmo QR adds a Gutenberg block that lets site visitors generate a QR code on the fly. The visitor types or pastes a URL, the block renders the corresponding QR code as an SVG in the browser, and the visitor can copy the SVG markup or download it as a file.

The block supports multiple color themes (red, green, black) that accent the QR code's finder patterns, and is built with the WordPress Interactivity API for a fully client-rendered, dependency-light experience.

Features:

* Live QR code generation from any URL, rendered client-side as SVG
* Copy SVG markup to clipboard
* Download the generated QR code as an `.svg` file
* Selectable color themes for the QR code accents
* Built with the WordPress Interactivity API (no custom React runtime)

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/carmo-qr` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress.
3. Add the "Carmo QR" block to any post or page from the block inserter.

== Frequently Asked Questions ==

= Does this block require an external API or service? =

No. The QR code is generated entirely in the visitor's browser; no data is sent to a third-party service.

= Can I change the QR code's color? =

Yes. The block includes selectable color themes that accent the QR code's finder patterns.

= Can visitors download the QR code? =

Yes. Visitors can download the generated QR code as an SVG file, or copy the SVG markup directly.

== Screenshots ==

1. The Carmo QR block on the front end, generating a QR code from a URL.

== Changelog ==

= 0.1.12 =
* Aligned WordPress/PHP version requirements with the plugin's coding standards (WordPress 6.9+, PHP 8.2+).
* Renamed the block namespace from the `create-block` scaffold default to `carmo-qr`.
* Refactored the plugin bootstrap to an OOP, namespaced structure with `declare(strict_types=1)`.

= 0.1.11 =
* Replaced the qrcode-svg dependency (which required Node's `fs` module) with qrcode-generator to fix a front-end build error.

= 0.1.0 =
* Initial release.
