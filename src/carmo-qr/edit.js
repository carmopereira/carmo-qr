import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';

export default function Edit() {
	return (
		<div { ...useBlockProps() }>
			<div className="carmo-qr__placeholder">
				<span className="dashicons dashicons-grid-view"></span>
				<p>{ __( 'Carmo QR — Gerador de QR Code', 'carmo-qr' ) }</p>
				<small>{ __( 'Os visitantes poderão inserir um URL e gerar um QR code SVG.', 'carmo-qr' ) }</small>
			</div>
		</div>
	);
}
