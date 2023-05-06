const configs = {
  development: {use_env_variable: process.env.DEVELOPMENT_URI},
  staging: {use_env_variable: process.env.STAGING_URI},
  production: {use_env_variable: process.env.PRODUCTION_URI},
}


export default configs