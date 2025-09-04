import Sparkasse from './client.js';

const sparkasse = new Sparkasse();

async function main() {
    const institute = await sparkasse.getInstitute("B");
    const firstResult = institute[0];
    const blz = firstResult.bin;
    const name = firstResult.name;
    // console.log({ blz, name });
    institute.forEach(element => {
        console.log(element.bin + " - " + element.name);
    });
    
    const url = await sparkasse.getURL(blz);
    console.log(url);
}

main();