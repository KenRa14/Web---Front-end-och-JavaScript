export default function bishBosh(bish, bosh, length) {
    let output = [];

    if (bish < 1 || bosh < 1) {
        return output;
    }

    for (let i = 1; i <= length; i++) {
        let value = '';
        if (i % bish == 0) {
            value = 'Bish';
        }
        if (i % bosh == 0) {
            value = (value === '') ? 'Bosh' : value + '-Bosh';
        }

        output.push((value === '') ? i.toString() : value);

    }
    return output;
}