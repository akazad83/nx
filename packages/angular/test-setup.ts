const allowedProjectExtensions = [
  'tags',
  'implicitDependencies',
  'configFilePath',
  '$schema',
  'generators',
];

const possiblePaths = [
  '@schematics/angular/node_modules/@angular-devkit/core/src/workspace/json/reader',
  '@angular-devkit/core/src/workspace/json/reader',
];
for (const possiblePath of possiblePaths) {
  try {
    jest.mock(possiblePath, () => {
      const originalModule = jest.requireActual(
        possiblePath
      ) as typeof import('@angular-devkit/core/src/workspace/json/reader');
      const originalReadJsonWorkspace = originalModule.readJsonWorkspace;
      return {
        ...originalModule,
        readJsonWorkspace: async (path, host, options) => {
          return originalReadJsonWorkspace(path, host, {
            ...options,
            allowedProjectExtensions,
          });
        },
      };
    });
  } catch {}
}
