import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import SubMainNavigation from '../../shared/components/Navigation/SubMainNavigation';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Input from '../../shared/components/FormElements/Input';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useForm } from '../../shared/hooks/form-hook';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import { useHttp } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/authContext';
import PostsList from '../../users/components/PostsList';

import './Home.css'
import '../components/CreatePostForm.css';
import React from 'react';

const Home = props => {
    const auth = useContext(AuthContext);
    const [newPost, setNewPost] = useState(false);
    const {isLoading, error, sendRequest, clearError} = useHttp();

    // const [loadedPosts, setLoadedPosts] = useState();

    const [formState, inputHandler] = useForm(
        {
            title: {
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
        //setNewPost(false);
        //console.log(formState.inputs); //send this to backend later
        try {
          await sendRequest('http://localhost:5002/api/home',
          'POST',
          JSON.stringify({
           title: formState.inputs.title.value,
           description: formState.inputs.description.value,
           creator: auth.userId
        }),
          { 'Content-Type': 'application/json'}
        );
         navigate('/');
        } catch(err) {

        };
        //setNewPost(false);
    }

  //   useEffect(() => {
  //     const getPosts = async() => {
  //         try {
  //             const responseData = await sendRequest('http://localhost:5002/api/home');
  //             setLoadedPosts(responseData.posts);
  //         } catch(err) {
  //         }
  //     }
  //     getPosts();
  // }, [sendRequest]);

    // const postItem = () => {
    //   return (
    //     <h1>injectedPost</h1>
    //   );
    // }

    return (
      <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        <Modal
          show={newPost}
          onCancel={closeNewPostHandler}
          header={"Create New Post"}
          footer={
            <React.Fragment>
              {/* not sure about this */}
              {isLoading && <LoadingSpinner asOverlay />}
              <Button onClick={closeNewPostHandler}>CANCEL</Button>
              <Button
                type="submit"
                onClick={confirmPostHandler}
                // onClick={() => {
                //   confirmPostHandler();
                //   postItem();
                // }}
                disabled={!formState.isValid}
              >
                POST
              </Button>
            </React.Fragment>
          }
        >
          {/* Props.children from Modal */}
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
        <Button onClick={openNewPostHandler}>New Post</Button>
        {/* {postItem()} */}
        {/* <PostsList posts={loadedPosts}/> */}
      </React.Fragment>
    );
}

export default Home;