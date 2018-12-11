const productionConfig = {
    ApiUrl: "https://api.loaner-car.com",
};

const localDebugConfig = {
    ApiUrl: "http://localhost:3000",
};

const configList = {
    'production': productionConfig,
    'localDebug': localDebugConfig,
    'development': localDebugConfig
};

export const Environment = configList[process.env.NODE_ENV];