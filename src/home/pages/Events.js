import React from 'react';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import SubMainNavigation from '../../shared/components/Navigation/SubMainNavigation';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Input from '../../shared/components/FormElements/Input';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useForm } from '../../shared/hooks/form-hook';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import { AuthContext } from '../../shared/context/authContext';
import { useHttp } from '../../shared/hooks/http-hook';

import './Events.css'
import '../components/CreatePostForm.css';

const Events = props => {
    const auth = useContext(AuthContext);
    const {isLoading, error, sendRequest, clearError} = useHttp();
    const [newPost, setNewPost] = useState(false);

    const [formState, inputHandler] = useForm(
        {
            title: {
                value: '',
                isValid: false
            },
            eventDate: {
                value: '',
                isValid: false
            },
            eventTime: {
              value: '',
              isValid: false
          },
            place: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            }
        },
        false
    );

    const navigate = useNavigate();

    const openNewPostHandler = () => setNewPost(true);
    const closeNewPostHandler = () => setNewPost(false);

    const confirmPostHandler = async () => {
        // setNewPost(false);
        // console.log(formState.inputs); //send to backend later
      try {
        await sendRequest('http://localhost:5002/api/events',
          'POST',
          JSON.stringify({
           title: formState.inputs.title.value,
           description: formState.inputs.description.value,
           eventDate: formState.inputs.eventDate.value,
           eventTime: formState.inputs.eventTime.value,
           place: formState.inputs.place.value,
           creator: auth.userId
        }),
          { 'Content-Type': 'application/json'}
        );
        navigate('/');
      } catch(err) {
      };

    }

    return (
      <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        <Modal
          show={newPost}
          onCancel={closeNewPostHandler}
          header={"Create New Event"}
          footer={
            <React.Fragment>
              <Button onClick={closeNewPostHandler}>CANCEL</Button>
              <Button
                onClick={confirmPostHandler}
                disabled={!formState.isValid}
              >
                POST
              </Button>
            </React.Fragment>
          }
        >
          {/* Props.children z Modal */}
          <div className="form-styles">
            {isLoading && <LoadingSpinner asOverlay />}
            <Input
              id="title"
              element="input"
              type="text"
              label="Title"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid title."
              onInput={inputHandler}
            />
            <Input
              id="place"
              element="input"
              type="text"
              label="Place"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid place."
              onInput={inputHandler}
            />
            <Input
              id="eventDate"
              element="input"
              type="date"
              label="Date"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid date."
              onInput={inputHandler}
            />
            <Input
              id="eventTime"
              element="input"
              type="time"
              label="Time"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid date."
              onInput={inputHandler}
            />
            <Input
              id="description"
              element="textarea"
              label="Description"
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText="Please enter a valid description (at least 5 characters)."
              onInput={inputHandler}
            />
          </div>
        </Modal>

        <SubMainNavigation />
        <Button onClick={openNewPostHandler}>New Event</Button>
      </React.Fragment>
    );
}

export default Events;