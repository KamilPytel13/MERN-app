import { useState } from 'react';

import SubMainNavigation from '../../shared/components/Navigation/SubMainNavigation';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';

import './Events.css'
import '../components/CreatePostForm.css';
import React from 'react';

const Events = props => {
    const [newPost, setNewPost] = useState(false);

    const openNewPostHandler = () => setNewPost(true);
    const closeNewPostHandler = () => setNewPost(false);

    const confirmPostHandler = () => {
        setNewPost(false);
        console.log('posting');
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
              <Button onClick={confirmPostHandler}>POST</Button>
            </React.Fragment>
          }
        >
          {/* Props.children z Modal */}
          <div className="form-styles">
            <h3>Title</h3>
            <input id="title"></input>
            <h3>Where</h3>
            <input id="where"></input>
            <h3>When</h3>
            <input id='when' type='date'></input>
            <h3>Description</h3>
            <textarea id="description" rows="3"></textarea>
          </div>
        </Modal>

        <SubMainNavigation />
        <Button onClick={openNewPostHandler}>New Event</Button>
      </React.Fragment>
    );
}

export default Events;