// webpack.config.js
const path = require('path');
const fs = require('fs-extra');
const { optimize } = require('svgo');
const cheerio = require('cheerio');

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

        const $ = cheerio.load(optimized, { xmlMode: true });

        $('[fill],[stroke],[style]').removeAttr('fill stroke style');

        const fileName = path.basename(filePath)
            .replace(/\s+/g, '_')
            .replace(/ä/g, 'ae')
            .replace(/ö/g, 'oe')
            .replace(/ü/g, 'ue')
            .toLowerCase();

        const outPath = path.join(outputDir, fileName);
        await fs.outputFile(outPath, $.xml());
        console.log('Created:', fileName);
    }

    apply(compiler) {
        compiler.hooks.beforeRun.tapPromise('SvgExportPlugin', async () => {
            const inputDir = path.resolve(__dirname, 'input/SVG');
            const outputDir = path.resolve(__dirname, 'output/eonUI');
            await this.clean(outputDir);
            console.log('🧹 Cleaned output directory');

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