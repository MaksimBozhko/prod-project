const fs = require('fs/promises')
const rootResolve = require('../rootResolver')
const firstCharUpperCase = require('../firstCharUpperCase')
const storyTemplate = require('./storyTemplate')
const styleTemplate = require('./styleTemplate')
const componentTemplate = require('./componentTemplate')

module.exports = async (layer, sliceName) => {
  const resolveUIPath = (...segments) => rootResolve('src', layer, sliceName, 'ui', ...segments)

  const createUIDir = async () => {
    try {
      await fs.mkdir(resolveUIPath())
    } catch (e) {
      console.log('Не удалось создать UI директорию');
    }
  }

  const createComponent = async () => {
    try {
      const componentName = firstCharUpperCase(sliceName)
      await fs.mkdir(resolveUIPath(componentName))

      await fs.writeFile(
        resolveUIPath(componentName, `${componentName}.tsx`),
        componentTemplate(componentName),
      )

      await fs.writeFile(
        resolveUIPath(componentName, `${componentName}.stories.tsx`),
        storyTemplate(layer, componentName),
      )

      await fs.writeFile(
        resolveUIPath(componentName, `${componentName}.module.scss`),
        styleTemplate(componentName),
      )
    } catch (e) {
      console.log('Не удалось создать компонент');
    }
  }

  await createUIDir()
  await createComponent()
}
