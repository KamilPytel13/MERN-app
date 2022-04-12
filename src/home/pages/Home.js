import { useState } from 'react';

import SubMainNavigation from '../../shared/components/Navigation/SubMainNavigation';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';

import './Home.css'
import React from 'react';

const Home = props => {
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
        header={"Create New Post"}
        footer={
            <React.Fragment>
                <Button onClick={closeNewPostHandler}>CANCEL</Button>
                <Button onClick={confirmPostHandler}>POST</Button>
            </React.Fragment>
        }
        >
            {/* Props.children z Modal */}
            <p>Description</p>
            <input></input>
            <input></input>
        </Modal>

        <SubMainNavigation />
        <Button onClick={openNewPostHandler}>New Post</Button>
      </React.Fragment>
    );
}

export default Home;