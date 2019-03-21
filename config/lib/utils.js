
/**
 * This function filters out undefined rules and undefined loaders
 */
exports.createRuleGetter = (factory) => {
    return () => {
        const isProduction = process.env.NODE_ENV === 'production';
        return factory(isProduction)
            .map(rule => {
                if(rule.use) {
                    return {
                        ...rule,
                        use: rule.use.filter(Boolean),
                    };
                }
                return rule;
            })
            .filter(Boolean);
    }
}
