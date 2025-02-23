import { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";
import { FormInput } from "../form-input/form-input";
import { signUpStart } from "../../store/user/user.action";
import './sign-up-form.styles.scss';
import { Button } from "../button/button";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const SignUp = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();

    if(password != confirmPassword){
        alert("password do not match");
        return;
    }

    try{
        // const {user} = await createAuthUserWithEmailAndPassword(email, password);
        // await createUserDocumentFromAuth(user, {displayName});
        dispatch(signUpStart(email, password, displayName))
        resetFormFields();
    }
    catch(error){
        if(error.code == "auth/email-already-in-use"){
            alert('Cannot create user, emailalready in use')
        }
        else {
            console.log('user creation encountered an error', error);
        }
        
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account</h2>
      <span>Signup with your email and password</span>
      <form onSubmit= {handleSubmit}>
        
        <FormInput
          label="Display Name"
          type="text"
          onChange={handleChange}
          name="displayName"
          value={displayName}
          required
        />

        <FormInput
          label="Email"
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
          required
        />

        <FormInput
          label="Password"
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
          required
        />
        
        <FormInput
          label="Confirm Password"
          type="password"
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
          required
        />

        <Button type="submit">Sign up</Button>
      </form>
    </div>
  );
};

export { SignUp };
