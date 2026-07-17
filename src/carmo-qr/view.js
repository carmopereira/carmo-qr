import { store, getContext, getElement } from '@wordpress/interactivity';
import qrcode from 'qrcode-generator';

const THEME_COLORS = {
	red: '#e52521',
	green: '#709b49',
	black: '#000000',
};

/**
 * Determines if a module at (row, col) belongs to the inner 3×3 center
 * of the bottom-left finder pattern.
 */
function isBottomLeftInner( row, col, moduleCount ) {
	const startRow = moduleCount - 7;
	return (
		row >= startRow + 2 &&
		row <= startRow + 4 &&
		col >= 2 &&
		col <= 4
	);
}

/**
 * Determines if a module at (row, col) belongs to the outer border (frame)
 * of the top-right finder pattern.
 */
function isTopRightOuterBorder( row, col, moduleCount ) {
	const startCol = moduleCount - 7;
	// Must be within the 7×7 finder pattern area.
	if ( row < 0 || row > 6 || col < startCol || col > moduleCount - 1 ) {
		return false;
	}
	const relRow = row;
	const relCol = col - startCol;
	// Outer border = first or last row/col of the 7×7 block.
	return relRow === 0 || relRow === 6 || relCol === 0 || relCol === 6;
}

/**
 * Builds an SVG string from the QR module matrix with theme-based accent colors.
 */
function buildSVG( modules, moduleCount, theme ) {
	const accentColor = THEME_COLORS[ theme ] || '#000000';
	const cellSize = 10;
	const margin = 40; // match qrcode-svg default (4 cells × 10)
	const size = moduleCount * cellSize + margin * 2;

	let rects = '';
	for ( let row = 0; row < moduleCount; row++ ) {
		for ( let col = 0; col < moduleCount; col++ ) {
			if ( ! modules[ row ][ col ] ) {
				continue;
			}

			let fill = '#000000';
			if (
				isBottomLeftInner( row, col, moduleCount ) ||
				isTopRightOuterBorder( row, col, moduleCount )
			) {
				fill = accentColor;
			}

			const x = margin + col * cellSize;
			const y = margin + row * cellSize;
			rects += `<rect x="${ x }" y="${ y }" width="${ cellSize }" height="${ cellSize }" fill="${ fill }"/>`;
		}
	}

	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${ size } ${ size }">` +
		`<rect width="100%" height="100%" fill="#ffffff"/>` +
		rects +
		`</svg>`;
}

store( 'carmo-qr/carmo-qr', {
	state: {
		get isRedTheme() {
			return getContext().theme === 'red';
		},
		get isGreenTheme() {
			return getContext().theme === 'green';
		},
		get isBlackTheme() {
			return getContext().theme === 'black';
		},
	},
	actions: {
		updateURL: () => {
			const ctx = getContext();
			const { ref } = getElement();
			ctx.url = ref.value;
		},
		changeTheme: () => {
			const ctx = getContext();
			const { ref } = getElement();
			ctx.theme = ref.value;
		},
		copySVG: () => {
			const ctx = getContext();
			navigator.clipboard.writeText( ctx.svgString ).then( () => {
				ctx.copyLabel = 'Copiado!';
				setTimeout( () => {
					ctx.copyLabel = 'Copiar SVG';
				}, 2000 );
			} );
		},
		downloadSVG: () => {
			const ctx = getContext();
			const blob = new Blob( [ ctx.svgString ], {
				type: 'image/svg+xml',
			} );
			const a = document.createElement( 'a' );
			a.href = URL.createObjectURL( blob );
			a.download = 'qrcode.svg';
			a.click();
			URL.revokeObjectURL( a.href );
		},
	},
	callbacks: {
		renderQR: () => {
			const ctx = getContext();
			const { ref } = getElement();
			if ( ! ctx.url ) {
				ref.innerHTML = '';
				ctx.svgString = '';
				return;
			}
			try {
				const qr = qrcode( 0, 'Q' );
				qr.addData( ctx.url );
				qr.make();
				const moduleCount = qr.getModuleCount();
				const modules = [];
				for ( let row = 0; row < moduleCount; row++ ) {
					modules.push( [] );
					for ( let col = 0; col < moduleCount; col++ ) {
						modules[ row ].push( qr.isDark( row, col ) );
					}
				}
				const svg = buildSVG( modules, moduleCount, ctx.theme );
				ctx.svgString = svg;
				ref.innerHTML = svg;
			} catch ( e ) {
				ref.innerHTML = '';
				ctx.svgString = '';
			}
		},
	},
} );
