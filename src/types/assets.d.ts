/*
    This file fixes typescript so that you can import non-js files.
*/

declare module '*.css';

// images
declare module '*.jpg' {
    const url: string;
    export default url;
}
declare module '*.jpeg' {
    const url: string;
    export default url;
}
declare module '*.png' {
    const url: string;
    export default url;
}
declare module '*.gif' {
    const url: string;
    export default url;
}


type SpriteSymbol = {
    id: string,
    viewBox: string,
    url: string,
}

declare module '*.svg' {
	const symbol: any;
    export default symbol;
}

// fonts
declare module '*.woff' {
    const url: string;
    export default url;
}
declare module '*.woff2' {
    const url: string;
    export default url;
}
declare module '*.ttf' {
    const url: string;
    export default url;
}
declare module '*.otf' {
    const url: string;
    export default url;
}
