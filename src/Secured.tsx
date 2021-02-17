import React, {Component} from 'react';
import Keycloak from 'keycloak-js';

interface SecuredState {
    keycloak?: Keycloak.KeycloakInstance,
    authenticated: boolean

    userInfo?: any
}

const keycloak = Keycloak({
    url: 'http://localhost:9000/auth',
    realm: "jktest",
    clientId: "jkefrontend"
});

class Secured extends Component<any, SecuredState> {
    constructor(props: any) {
        super(props);
        this.state = {
            keycloak: undefined,
            authenticated: false,

            userInfo: null
        };
    }

    componentDidMount() {


        keycloak.init({onLoad: 'login-required'}).then(authenticated => {
            console.log('got auth!')
            this.setState({
                keycloak: keycloak,
                authenticated: authenticated
            })

            keycloak.loadUserInfo().then(userInfo => {
                this.setState({
                    userInfo: userInfo
                })
            })
        }).catch(error => {
            console.log(`got error with auth :/ ${error}`)
        })
    }

    logout = () => {
        keycloak.logout()
    }

    render() {
        if (this.state.keycloak) {
            if (this.state.authenticated) return (
                <div>
                    <p>This is a Keycloak-secured component of your application. You shouldn't be able
                        to see this unless you've authenticated with Keycloak.</p>

                    {this.state.userInfo !== null ?
                        <div>
                            User Info:
                            {JSON.stringify(this.state.userInfo)}
                        </div>
                        : null}

                    <button onClick={this.logout}>logout la</button>
                </div>
            ); else return (<div>Unable to authenticate!</div>)
        }
        return (
            <div>Initializing Keycloak...</div>
        );
    }
}

export default Secured;