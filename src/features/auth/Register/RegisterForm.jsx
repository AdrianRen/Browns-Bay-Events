import React from 'react';
import { Form, Segment, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import TextInput from '../../../app/common/form/TextInput';
import {registerUser} from "../authActions";

const actions = {
  registerUser
};

const RegisterForm = ({registerUser, error, handleSubmit}) => {
  return (
    <div>
      <Form size="large" onSubmit={handleSubmit(registerUser)}>
        <Segment>
          <Field
            name="displayName"
            type="text"
            component={TextInput}
            placeholder="Known As"
          />
          <Field
            name="email"
            type="text"
            component={TextInput}
            placeholder="Email"
          />
          <Field
            name="password"
            type="password"
            component={TextInput}
            placeholder="Password"
          />
          <Button fluid size="large" color="teal">
            Register
          </Button>
        </Segment>
      </Form>
    </div>
  );
};

export default connect(null, actions)(reduxForm({form:'registerForm'})(RegisterForm));