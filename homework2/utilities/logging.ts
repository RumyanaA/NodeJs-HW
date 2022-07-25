import debug from 'debug';

export const logInfo = (
    serviceMethodName: string,
    firstArgument: any,
    secondArgument = null
) => {
    const debugService = debug('service');
    const methodArguments = secondArgument
        ? `first argument: ${JSON.stringify(firstArgument)}, second argument: ${JSON.stringify(secondArgument)}`
        : `argument: ${JSON.stringify(firstArgument)}`;
    debugService(`method: ${serviceMethodName}, ${methodArguments} `);
};