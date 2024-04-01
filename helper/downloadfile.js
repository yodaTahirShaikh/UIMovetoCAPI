let directory = 'result';

function readCsv(directory) {
    const data = [];
    const files = fs.readdirSync(directory).filter(file => file.endsWith('.csv'));
    const fileName = files[0] || '';
}