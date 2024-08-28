# Running Cerbos on Heroku

A barebones deployment of Cerbos on Heroku leveraging the NPM package for simplicity.

The PDP is configured via the `.cerbos.yaml` file and environment variables are used for configured the port and other settings:

```
server:
  httpListenAddr: ":${PORT}"

hub:
  credentials:
    clientID: ${CERBOS_HUB_CLIENT_ID} # ClientID
    clientSecret: ${CERBOS_HUB_CLIENT_SECRET} # ClientSecret
    workspaceSecret: ${CERBOS_HUB_WORKSPACE_SECRET} # WorkspaceSecret to decrypt the bundles -- generated during workspace creation
    pdpID: ${CERBOS_HUB_PDP_ID}

storage:
  driver: hub
  hub:
    remote:
      bundleLabel: main

audit:
  enabled: true
  backend: hub
  accessLogsEnabled: true
  decisionLogsEnabled: true
  hub:
    storagePath: "/tmp"
```

The Cerbos PDP will then be avaliable on the Heroku URL.
