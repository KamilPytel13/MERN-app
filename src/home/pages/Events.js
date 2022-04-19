import { useState } from 'react';

import SubMainNavigation from '../../shared/components/Navigation/SubMainNavigation';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Input from '../../shared/components/FormElements/Input';
import { useForm } from '../../shared/hooks/form-hook';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';

import './Events.css'
import '../components/CreatePostForm.css';
import React from 'react';

const Events = props => {
    const [newPost, setNewPost] = useState(false);

    const [formState, inputHandler] = useForm(
        {
            title: {
                value: '',
                isValid: false
            },
            when: {
                value: '',
                isValid: false
            },
            where: {
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

    const openNewPostHandler = () => setNewPost(true);
    const closeNewPostHandler = () => setNewPost(false);

    const confirmPostHandler = () => {
        setNewPost(false);
        console.log(formState.inputs); //send to backend later
    }

    return (
      <React.Fragment>
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
              id="where"
              element="input"
              type="text"
              label="Where"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid place."
              onInput={inputHandler}
            />
            <Input
              id="when"
              element="input"
              type="date"
              label="When"
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