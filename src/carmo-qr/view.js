import { store, getContext, getElement } from '@wordpress/interactivity';
import qrcode from 'qrcode-generator';

const THEME_COLORS = {
	red: '#e52521',
	green: '#709b49',
	black: '#000000',
	yellow: '#fed373',
	orange: '#f77737',
};

const ICON_DEFS = {
	web: {
		viewBox: [ 24, 24 ],
		markup: '<path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>',
	},
	youtube: {
		viewBox: [ 24, 24 ],
		markup: '<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>',
	},
	instagram: {
		viewBox: [ 24, 24 ],
		markup: '<path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"/>',
	},
	gg: {
		viewBox: [ 25.55, 14.65 ],
		markup: '<polygon points="17.06 9.28 11.31 9.29 13.66 9.28 17.06 9.28"/>' +
			'<g><g>' +
			'<path d="M25.55,12.72c0,.35-.09.68-.26.96-.25.43-.68.76-1.18.89-.15.03-.31.06-.48.06-1.06,0-1.91-.86-1.93-1.91,0-1.06.86-1.93,1.93-1.93.34,0,.66.09.94.25.37.22.68.56.85.97.08.22.12.45.12.7Z"/>' +
			'<path d="M25.55,7.35c0,.6-.27,1.12-.69,1.48-.33.27-.76.44-1.22.44h-12.32s-1.65.01-1.65.01c-1.03-.03-1.86-.88-1.86-1.93,0-.95.7-1.74,1.62-1.89.09-.01.19-.02.29-.02h8.13s5.78-.01,5.78-.01c.65,0,1.22.32,1.56.8.23.32.36.7.36,1.11Z"/>' +
			'</g>' +
			'<path d="M25.55,1.91c0,1.04-.84,1.9-1.88,1.91-.02,0-.03.01-.05.01h-10.61c-.31,0-.6-.07-.85-.19-.63-.32-1.06-.97-1.06-1.72,0-.4.11-.77.32-1.06.29-.43.75-.74,1.28-.83.1-.02.2-.03.32-.03h10.61c.42,0,.82.14,1.12.36.49.35.79.92.8,1.55Z"/>' +
			'<path d="M19.76,12.72c0,.77-.45,1.43-1.1,1.73-.25.12-.52.18-.82.18h-8.98s-6.93.01-6.93.01c-.75.01-1.39-.42-1.71-1.04-.14-.25-.2-.53-.22-.84v-.03c0-.84.53-1.54,1.28-1.81.2-.07.42-.1.63-.1h9.29s6.64-.01,6.64-.01c.46,0,.89.16,1.22.44.43.35.69.88.69,1.47Z"/>' +
			'<polygon points="17.85 5.44 16.23 5.45 16.23 5.44 17.85 5.44"/>' +
			'<polygon points="16.23 5.44 16.23 5.45 15.47 5.45 16.23 5.44"/>' +
			'<polygon points="17.66 14.63 15.09 14.64 15.09 14.63 17.66 14.63"/>' +
			'<rect x="11.71" y="14.63" width="3.38" height=".01"/>' +
			'<polygon points="11.21 10.81 9.75 10.82 9.75 10.81 11.21 10.81"/>' +
			'<rect x="9.99" y="14.63" width="1.72" height=".01"/>' +
			'<g>' +
			'<rect x="8.21" y="10.81" width="1.54" height=".01"/>' +
			'<polygon points="9.99 14.63 9.99 14.64 8.87 14.64 9.99 14.63"/>' +
			'<path d="M9.15,1.93c0,1.06-.86,1.93-1.93,1.93H1.93c-.29,0-.58-.07-.84-.19-.63-.31-1.09-.96-1.09-1.72C0,1.35.26.83.67.48,1.01.19,1.44.01,1.93.01h5.3c1.06,0,1.93.86,1.93,1.91Z"/>' +
			'</g>' +
			'<rect x="7.5" y="10.81" width=".71" height=".01"/>' +
			'<g>' +
			'<polygon points="7.5 10.81 7.5 10.82 5.03 10.82 7.5 10.81"/>' +
			'<path d="M5.86,7.37c0,.85-.55,1.57-1.33,1.82-.19.06-.39.09-.6.09H1.83c-.33-.01-.63-.11-.89-.27C.39,8.69.01,8.08.01,7.37c0-.44.15-.86.41-1.19.23-.29.55-.52.92-.63.19-.07.39-.1.59-.1h2c.27,0,.53.06.76.16.68.29,1.16.97,1.17,1.77Z"/>' +
			'</g>' +
			'</g>',
	},
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
 * When an `icon` is selected, the modules under the icon's centered frame are
 * skipped and a white square frame with the icon glyph (rendered in the
 * theme's accent color) is overlaid instead. The frame is snapped to whole
 * module boundaries so every module is either fully kept or fully removed —
 * never partially cut — and covers ~27% of the code's width (~7% of its
 * area), well within the ~25% error-correction budget of the 'Q' level used
 * to generate the QR. The glyph keeps a fixed 1-module padding from the
 * frame edge.
 */
function buildSVG( modules, moduleCount, theme, icon ) {
	const accentColor = THEME_COLORS[ theme ] || '#000000';
	const cellSize = 10;
	const margin = 40; // match qrcode-svg default (4 cells × 10)
	const contentSize = moduleCount * cellSize;
	const size = contentSize + margin * 2;

	const iconDef = icon && icon !== 'none' ? ICON_DEFS[ icon ] : null;
	let iconBox = null;
	if ( iconDef ) {
		const frameModules = Math.max( 3, Math.round( moduleCount * 0.27 ) );
		const startModule = Math.floor( ( moduleCount - frameModules ) / 2 );
		const frameSize = frameModules * cellSize;
		iconBox = {
			x: margin + startModule * cellSize,
			y: margin + startModule * cellSize,
			size: frameSize,
		};
	}

	let rects = '';
	for ( let row = 0; row < moduleCount; row++ ) {
		for ( let col = 0; col < moduleCount; col++ ) {
			if ( ! modules[ row ][ col ] ) {
				continue;
			}

			const x = margin + col * cellSize;
			const y = margin + row * cellSize;

			if ( iconBox ) {
				const cx = x + cellSize / 2;
				const cy = y + cellSize / 2;
				if (
					cx >= iconBox.x &&
					cx <= iconBox.x + iconBox.size &&
					cy >= iconBox.y &&
					cy <= iconBox.y + iconBox.size
				) {
					continue;
				}
			}

			let fill = '#000000';
			if (
				isBottomLeftInner( row, col, moduleCount ) ||
				isTopRightOuterBorder( row, col, moduleCount )
			) {
				fill = accentColor;
			}

			rects += `<rect x="${ x }" y="${ y }" width="${ cellSize }" height="${ cellSize }" fill="${ fill }"/>`;
		}
	}

	let overlay = '';
	if ( iconBox ) {
		// Fixed 1-module padding guarantees a clean quiet gap between the
		// glyph and the frame edge, regardless of frame size.
		const padding = cellSize;
		const innerSize = iconBox.size - padding * 2;
		const [ vbWidth, vbHeight ] = iconDef.viewBox;
		// Contain-fit: scale by the glyph's larger dimension so non-square
		// icons (e.g. a wide wordmark) never overflow the inner box.
		const scale = innerSize / Math.max( vbWidth, vbHeight );
		const iconX = iconBox.x + padding + ( innerSize - vbWidth * scale ) / 2;
		const iconY = iconBox.y + padding + ( innerSize - vbHeight * scale ) / 2;
		// The frame has square corners so it never clips a module diagonally —
		// its edges always sit exactly on module boundaries.
		overlay =
			`<rect x="${ iconBox.x }" y="${ iconBox.y }" width="${ iconBox.size }" height="${ iconBox.size }" fill="#ffffff"/>` +
			`<g transform="translate(${ iconX } ${ iconY }) scale(${ scale })" fill="${ accentColor }">${ iconDef.markup }</g>`;
	}

	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${ size } ${ size }">` +
		`<rect width="100%" height="100%" fill="#ffffff"/>` +
		rects +
		overlay +
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
		get isYellowTheme() {
			return getContext().theme === 'yellow';
		},
		get isOrangeTheme() {
			return getContext().theme === 'orange';
		},
		get isNoIcon() {
			return getContext().icon === 'none';
		},
		get isWebIcon() {
			return getContext().icon === 'web';
		},
		get isYoutubeIcon() {
			return getContext().icon === 'youtube';
		},
		get isInstagramIcon() {
			return getContext().icon === 'instagram';
		},
		get isGgIcon() {
			return getContext().icon === 'gg';
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
		changeIcon: () => {
			const ctx = getContext();
			const { ref } = getElement();
			ctx.icon = ref.value;
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
				const svg = buildSVG( modules, moduleCount, ctx.theme, ctx.icon );
				ctx.svgString = svg;
				ref.innerHTML = svg;
			} catch ( e ) {
				ref.innerHTML = '';
				ctx.svgString = '';
			}
		},
	},
} );
