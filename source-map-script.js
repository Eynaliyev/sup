const fs = require('fs');
const path = require('path');
const wwwDir = path.resolve(__dirname, 'www');
const buildDir = path.resolve(wwwDir, 'build');

fs.readdirSync(buildDir).forEach(file => {
    if (file.endsWith('.js')) {
        const filePath = path.join(buildDir, file);
        let content = fs.readFileSync(filePath).toString('utf8');
        content += `\n//# sourceMappingURL=${file}.map`;
        fs.writeFileSync(filePath, content);
    }
});