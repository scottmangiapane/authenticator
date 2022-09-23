function validateConfig(config) {
    try {
        const parsed = JSON.parse(config);
        assertType(Array, parsed);
        for (const configItem of parsed) {
            assertType(Object, configItem);
            assertType(String, configItem.name);
            assertType(String, configItem.secret);
            assertType(Array, configItem['auto-fill']);
            for (const autoFillItem of configItem['auto-fill']) {
                assertType(String, autoFillItem);
            }
        }
        return true;
    } catch(err) {
        console.error(err);
    }
    return false;
}

function assertType(type, value) {
    if (value.constructor.name !== type.name) {
        throw new Error('Unexpected type');
    }
}

export default validateConfig;
