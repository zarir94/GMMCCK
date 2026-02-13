
export let defaultImg = 'https://iili.io/q93X73X.png';

let subject_code = {
	"বাংলা": [101, 102],
	"ইংরেজি": [107, 108],
	"তথ্য ও যোগাযোগ প্রযুক্তি": [275],
	"পদার্থ বিজ্ঞান": [174, 175],
	"রসায়ন": [176, 177],
	"জীব বিজ্ঞান": [178, 179],
	"উচ্চতর গণিত": [265, 266],
	"ইতিহাস": [304, 305],
	"ইসলামের ইতিহাস ও সংস্কৃতি": [267, 268],
	"পৌরনীতি ও সুশাসন": [269, 270],
	"অর্থনীতি": [109, 110],
	"যুক্তিবিদ্যা": [121, 122],
	"সমাজ বিজ্ঞান": [117, 118],
	"সমাজ কর্ম": [271, 272],
	"ভূগোল": [125, 126],
	"ব্যবসায় সংগঠন ও ব্যবস্থাপনা": [277, 278],
	"হিসাব বিজ্ঞান": [253, 254],
	"ফিন্যান্স, ব্যাংকিং ও বীমা": [292, 293],
	"উৎপাদন ব্যবস্থাপনা ও বিপণন": [286, 287],
	"ইসলাম শিক্ষা": [249, 250],
	"শিশুর বিকাশ": [298, 299],
	"গৃহ ব্যবস্থাপনা ও পারিবারিক জীবন": [282, 283],
	"কৃষিশিক্ষা": [240, 241],
	"মনোবিজ্ঞান": [123, 124],
	"পরিসংখ্যান": [129, 130],
	"মৃত্তিকা বিজ্ঞান": [288, 289],
	"গার্হস্থ্য বিজ্ঞান": [273, 274],
	"চারু ও কারুকলা": [225, 226],
	"শিল্পকলা ও বস্ত্র পরিচ্ছদ": [284, 285]
};


export function getSubject(codeStr: string) {
	let codes = codeStr.split('_').map(i=>parseInt(i)).filter(Boolean);
	let names = [];
	if (codes.length == 0) return null;
	for (const [nm, cds] of Object.entries(subject_code)) {
		for (let i = 0; i < cds.length; i++) {
			const sc = cds[i];
			if (codes.indexOf(sc) != -1) {
				names.push(nm);
			}
		}
	}
	return [...new Set(names)].join(', ');
}

export function CDN(url?: string, w?: number | string, q?: number | string, fallback?: string, output?: string) {
	url = url ? url : 'https://placehold.co/600x400?font=source-sans-pro&text=No+Image';
	if (url.indexOf('//localhost') != -1 || url.indexOf('//127.0.0.1') != -1) {
		return url;
	}
	let params: any = { url };
	if (w) params.w = w;
	if (q) params.q = q;
	if (output) params.output = output;
	if (fallback) params.fallback = CDN(fallback, w, q, undefined, output);
	let cdn = '//wsrv.nl/?' + new URLSearchParams(params).toString();
	return cdn;
}

export function formatDate(dateString: string, m: 'short' | 'long' = 'short') {
	let date = new Date(dateString);
	let day = date.getDate();
	let month = date.toLocaleString('default', { month: m });
	let year = date.getFullYear();

	return `${day} ${month}, ${year}`;
}

export function onImageMounted(node: HTMLImageElement) {
	let rm = ()=>{ node.classList.remove('skeleton') };
	if (node.complete && node.naturalWidth !== 0) {
		rm();
	} else {
		node.addEventListener('load', rm);
		node.addEventListener('error', rm);
	}
}

