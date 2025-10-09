// webpack.config.js
const path = require('path');
const fs = require('fs-extra');
const { optimize } = require('svgo');
const cheerio = require('cheerio');

const colors = {
    white: '#fff',
    sunset: '#FAAD66',
    'warm-nightsky': '#3A1F40',
    'pale-sun': '#FAD689',
    nofill: null,
};

class SvgExportPlugin {
    async clean(dir) {
        await fs.emptyDir(dir);
    }

    async processSvg(filePath, outputDir) {
        const rawSvg = await fs.readFile(filePath, 'utf8');
        const { data: optimized } = optimize(rawSvg, {
            multipass: true,
            floatPrecision: 4,
        });

        for (const [folder, fillColor] of Object.entries(colors)) {
            const $ = cheerio.load(optimized, { xmlMode: true });

            $('[fill],[stroke],[style]').removeAttr('fill stroke style');
            if (fillColor) $('path, rect, circle').attr('fill', fillColor);

            const fileName = path.basename(filePath)
                .replace(/\s+/g, '_')
                .replace(/ä/g, 'ae')
                .replace(/ö/g, 'oe')
                .replace(/ü/g, 'ue')
                .toLowerCase();

            const outPath = path.join(outputDir, folder, fileName);
            await fs.outputFile(outPath, $.xml());
        }
    }

    apply(compiler) {
        compiler.hooks.beforeRun.tapPromise('SvgExportPlugin', async () => {
            const inputDir = path.resolve(__dirname, 'input/SVG');
            const outputDir = path.resolve(__dirname, 'output/eonUI');
            await this.clean(outputDir);

            const files = await fs.readdir(inputDir);
            const svgs = files.filter((f) => f.endsWith('.svg'));

            for (const file of svgs) {
                await this.processSvg(path.join(inputDir, file), outputDir);
            }

            console.log(`✅ Exported ${svgs.length} SVGs to ${outputDir}`);
        });
    }
}

module.exports = {
    mode: 'development',
    plugins: [new SvgExportPlugin()],
};