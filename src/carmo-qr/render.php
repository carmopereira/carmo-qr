<?php
declare(strict_types=1);

/**
 * Renders the Carmo QR block on the front end.
 *
 * @var array    $attributes The block attributes.
 * @var string   $content    The block default content.
 * @var WP_Block $block      The block instance.
 */

$context = array(
	'url'       => '',
	'svgString' => '',
	'copyLabel' => __( 'Copiar SVG', 'carmo-qr' ),
	'theme'     => 'red',
);
?>
<div
	<?php echo get_block_wrapper_attributes(); ?>
	data-wp-interactive="create-block/carmo-qr"
	<?php echo wp_interactivity_data_wp_context( $context ); ?>
>
	<input
		class="carmo-qr__input"
		type="url"
		placeholder="<?php esc_attr_e( 'Inserir URL...', 'carmo-qr' ); ?>"
		data-wp-bind--value="context.url"
		data-wp-on--input="actions.updateURL"
	/>
	<fieldset class="carmo-qr__themes">
		<legend class="carmo-qr__themes-legend"><?php esc_html_e( 'Tema de cor', 'carmo-qr' ); ?></legend>
		<label class="carmo-qr__theme-label">
			<input
				type="radio"
				name="carmo-qr-theme"
				value="red"
				data-wp-bind--checked="state.isRedTheme"
				data-wp-on--change="actions.changeTheme"
			/>
			<span class="carmo-qr__theme-swatch carmo-qr__theme-swatch--red"></span>
			<?php esc_html_e( 'Vermelho', 'carmo-qr' ); ?>
		</label>
		<label class="carmo-qr__theme-label">
			<input
				type="radio"
				name="carmo-qr-theme"
				value="green"
				data-wp-bind--checked="state.isGreenTheme"
				data-wp-on--change="actions.changeTheme"
			/>
			<span class="carmo-qr__theme-swatch carmo-qr__theme-swatch--green"></span>
			<?php esc_html_e( 'Verde', 'carmo-qr' ); ?>
		</label>
		<label class="carmo-qr__theme-label">
			<input
				type="radio"
				name="carmo-qr-theme"
				value="black"
				data-wp-bind--checked="state.isBlackTheme"
				data-wp-on--change="actions.changeTheme"
			/>
			<span class="carmo-qr__theme-swatch carmo-qr__theme-swatch--black"></span>
			<?php esc_html_e( 'Preto', 'carmo-qr' ); ?>
		</label>
	</fieldset>
	<div class="carmo-qr__svg" data-wp-watch="callbacks.renderQR"></div>
	<div class="carmo-qr__buttons" data-wp-bind--hidden="!context.svgString">
		<button class="carmo-qr__btn" data-wp-on--click="actions.copySVG" data-wp-text="context.copyLabel"></button>
		<button class="carmo-qr__btn" data-wp-on--click="actions.downloadSVG"><?php esc_html_e( 'Download SVG', 'carmo-qr' ); ?></button>
	</div>
</div>
