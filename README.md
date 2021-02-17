
## keycloak
- start keycloak server with `sh run_keycloak.sh`
- go to `http://localhost:9000`, go to admin console, log in with `admin:test7733`
- in keycloak, import realm from `keycloak-realm-export.json`
- in keycloak, add a user, go to the user settings and set some password credentials
  
## react
- run `npm install` to install dependencies
- run `npm start` and go to `http://localhost:3000`