import React, { Component } from 'react';
import { AuthStore } from '../../helpers';
import { Redirect, Link, withRouter } from "react-router-dom";
import './Register.scss';
import UserContext from '../../context/users/UserContext';

class Register extends Component {
  constructor() {
    super();

    this.state = {
      firstname: 'Kaba',
      lastname: 'CONDE',
      email: 'kabaconde@gmail.com',
      password: 'kabaconde',
      passwordConfirmation: 'kabaconde',
      errorMessage: false
    };
  }

  handleChange = e => {
    let target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.firstname === '' ||
      this.state.lastname === '' ||
      this.state.email === '' ||
      this.state.password === '' ||
      this.state.passwordConfirmation === ''
    ) {
      this.setState({
        errorMessage: "Tous les champs doivent être remplis 🤔"
      });
      return;
    }

    if (this.state.firstname.length < 4) {
      this.setState({
        errorMessage: "Votre prénom est trop court (4 caractères minimum)"
      });
      return;
    }

    if (this.state.lastname.length < 4) {
      this.setState({
        errorMessage: "Votre nom de famille est trop court (4 caractères minimum)"
      });
      return;
    }

    if (this.state.password.length < 4) {
      this.setState({
        errorMessage: "Votre mot de passe est trop court (4 caractères minimum)"
      });
      return;
    }

    if (this.state.password.length !== this.state.passwordConfirmation.length) {
      this.setState({
        password: '',
        passwordConfirmation: '',
        errorMessage: "Vos mots de passe ne correspondent pas"
      });
      return;
    }

    this.props.userRegister(this.state).then(() => {
      this.setState({
        errorMessage: false,
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        successMessage: "👉Bien vous venez de rejoindre la communauté ✅"
      });

      document.querySelector("button").disabled = true;
      setTimeout(() => {
        this.props.history.push('/account/feeds');
      }, 2000);
    }).catch(response => {
      this.setState({
        errorMessage: response.errorMessage
      });
    });
  }

  render() {
    const logo = process.env.REACT_APP_URL + '/images/logo.svg';
    const emailIcon = process.env.REACT_APP_URL + '/icons/email-icon.svg';
    const passwordIcon = process.env.REACT_APP_URL + '/icons/password-icon.svg';

    if (AuthStore.isAuthenticated()) {
      return <Redirect to={{ pathname: "/account/feeds" }} />
    }

    return (
      <div className="Register container">
        <div className="row">
          <div className="col-12">

            <form onSubmit={this.handleSubmit} className="RegisterForm">
              <Link to="/account/feeds">
                <img src={logo} alt="Socialite Logo" className="logo" title="Socialite" />
              </Link>

              <div className="card">
                <div className="card-body">
                  <h5 className="card-title text-center">Rejoins-nous !</h5>
                  <h6 className="card-subtitle mb-2 text-muted text-center">
                    <Link to="/auth/login">Tu as déjà un compte ?</Link>
                  </h6>

                  {this.state.errorMessage && <div className="alert alert-danger" role="alert">
                    {this.state.errorMessage}
                  </div>}

                  {this.state.successMessage && <div className="alert alert-success" role="alert">
                    {this.state.successMessage}
                  </div>}

                  <div className="card-text">
                    <div className="form-group">
                      <label htmlFor="firstname">Prénom</label>
                      <div className="field-group">
                        <input type="text" name="firstname" className="form-control" value={this.state.firstname} onChange={this.handleChange} id="firstname" aria-describedby="firstnameHelp" placeholder="Entrez votre prénom" />
                        <img className="image" src={emailIcon} alt="Prénom" />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="lastname">Nom de famille</label>
                      <div className="field-group">
                        <input type="text" name="lastname" className="form-control" value={this.state.lastname} onChange={this.handleChange} id="lastname" aria-describedby="lastnameHelp" placeholder="Entrez votre nom de famille" />
                        <img className="image" src={emailIcon} alt="Nom de famille" />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Adresse e-mail</label>
                      <div className="field-group">
                        <input type="email" name="email" className="form-control" value={this.state.email} onChange={this.handleChange} id="email" aria-describedby="emailHelp" placeholder="Entrez votre email" />
                        <img className="image" src={emailIcon} alt="Mot de passe" />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">Mot de passe</label>
                      <div className="field-group">
                        <input type="password" name="password" className="form-control" value={this.state.password} onChange={this.handleChange} id="password" aria-describedby="emailHelp" placeholder="Entrez votre mot de passe" />
                        <img className="image image-password" src={passwordIcon} alt="Mot de passe" />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="passwordConfirmation">Confirmation du mot de passe</label>
                      <div className="field-group">
                        <input type="password" name="passwordConfirmation" className="form-control" value={this.state.passwordConfirmation} onChange={this.handleChange} id="passwordConfirmation" aria-describedby="emailHelp" placeholder="Entrez à nouveau votre mot de passe" />
                        <img className="image image-password" src={passwordIcon} alt="Mot de passe" />
                      </div>
                    </div>

                  </div>

                  <div className="button-row">
                    <button type="submit" className="btn btn-primary">Je me lance</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(React.forwardRef((props, ref) => (
  <UserContext.Consumer>
    {({ userRegister }) => <Register
      {...props}
      userRegister={userRegister}
      ref={ref}
    />
    }
  </UserContext.Consumer>
)));
