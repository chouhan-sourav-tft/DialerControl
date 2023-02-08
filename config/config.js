let host = (typeof process.env.npm_config_host) === 'undefined' ? 'https://qa-lab2.finesource.org' : process.env.npm_config_host;
let domainUUID = (typeof process.env.npm_config_domain_uuid) === 'undefined' ? '94ee4b33-0213-4f81-887c-2130b9e8193c' : process.env.npm_config_domain_uuid;
let email = (typeof process.env.npm_config_email) === 'undefined' ? 'qa.staging.inbound3@outlook.com' : process.env.npm_config_email;
let domain = (typeof process.env.npm_config_domain) === 'undefined' ? 'tests.surbhi' : process.env.npm_config_domain;
Object.assign(global, {
  BASE_URL: host,
  WEBCHAT_CLIENT_URL: 'https://www.gocontact.com/',
  WEBCHAT_IFRAME_URL: host + '/webchat_public/build/webchat.html',
  WEBCHAT_DOMAIN: domainUUID,
  WEBCHAT_SERVER: host + ':443/poll',
  TICKET_COUNTER: host + '/poll/ticket-main-service/tickets/counters/get',
  EMAIL: email,
  DOMAIN: domain,
  QA_API_KEY: 'kDsYFK0YuYM1jCRl94ruLAO#BESTZ7?MhD!'
});
