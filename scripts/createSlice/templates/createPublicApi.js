const fs = require('fs/promises')
const firstCharUpperCase = require('../firstCharUpperCase')
const rootResolve = require('../rootResolver')

module.exports = async (layer, sliceName) => {
  const componentName = firstCharUpperCase(sliceName);
  const schemaName = `${sliceName}Schema`;

  const indexContent = `export { ${componentName} } from './ui/${componentName}/${componentName}';
export { ${firstCharUpperCase(schemaName)} } from './model/types/${schemaName}';`

  try {
    await fs.writeFile(
      rootResolve('src', layer, sliceName, 'index.ts'),
      indexContent,
    )
  } catch (e) {
    console.log('Не удалось создать PUBLIC API');
  }
}
