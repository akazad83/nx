import redirectRules from './redirect-rules.config';

describe('Redirect rules configuration', () => {
  describe('Safety checks', () => {
    it('should not redirect to itself', () => {
      const rules = {
        ...redirectRules.cliUrls,
        ...redirectRules.diataxis,
        ...redirectRules.guideUrls,
        ...redirectRules.overviewUrls,
        ...redirectRules.schemaUrls,
      };

      for (let k of Object.keys(rules)) {
        expect(k).not.toEqual(rules[k]);
      }
    });
  });
});
