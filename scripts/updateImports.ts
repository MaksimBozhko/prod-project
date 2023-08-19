import { Project } from 'ts-morph';

const project = new Project();

project.addSourceFilesAtPaths([
  'src/**/*.ts',
  'src/**/*.tsx',
]);

const files = project.getSourceFiles()

const isAbsolute = (paths: string) => {
  const layers = ['app', 'entities', 'features', 'pages', 'shared', 'widgets']
  return layers.some((layer) => paths.startsWith(layer))
}

files.forEach((sourceFiles) => {
  const importDeclarations = sourceFiles.getImportDeclarations()
  importDeclarations.forEach((importDeclaration) => {
    const value = importDeclaration.getModuleSpecifierValue()
    if (isAbsolute(value)) {
      importDeclaration.setModuleSpecifier(`@/${value}`)
    }
  })
})

project.save()
