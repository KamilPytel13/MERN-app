import React, {useState, useContext} from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../shared/util/validators";
import Modal from "../../shared/components/UIElements/Modal";
import { useHttp } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/authContext";
//import './UserItem.css';
import './PostItem.css';

const PostItem = props => {
    const {isLoading, error, sendRequest, clearError} = useHttp();
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [loadedPost, setLoadedPost] = useState();
    const [counter, setCounter] = useState(0)
    const auth = useContext(AuthContext);
    //const postId = useParams().postId;
    const navigate = useNavigate();

    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }
    }, false);

    // return (
    //     <li className='user-item'>
    //         <Card className='user-item__content'>
    //             <div className='user-item__info'>
    //                 <h2>Title: {props.title}</h2>
    //                 <h2>Description: {props.description}</h2>
    //             </div>
    //         </Card>
    //     </li>
    // );
    const increaseCounter = () => {
        setCounter(count => count + 1);
    }

    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true);
      };
    
    const cancelDeleteHandler = () => {
        setShowConfirmModal(false);
      };

    const confirmDeleteHandler = async () => {
        setShowConfirmModal(false);
        try {
            await sendRequest(`http://localhost:5002/api/home/${props.id}`, 'DELETE');
            props.onDelete(props.id);
        } catch(err) {
        }
    };

    const showEditPostHandler = () => {
        setShowEditModal(true);
    }

    const canceEditPostHandler = () => {
        setShowEditModal(false);
    }

    const postUpdateSubmitHandler = async event => {
        event.preventDefault();
        try {
            await sendRequest(
                `http://localhost:5002/api/home/${props.id}`,
                "PATCH",
                JSON.stringify({
                  title: formState.inputs.title.value,
                  description: formState.inputs.description.value,
                }),
                {
                  "Content-Type": "application/json",
                }
              );
              navigate('/')
        } catch(err) {}
    }

    const editPostHandler = () => {
            const fetchPost = async () => {
                try {
                    const responseData = await sendRequest(`http://localhost:5002/api/home/${props.id}`);
                    setLoadedPost(responseData.post);
                    setFormData({
                        title: {
                            value: responseData.post.title,
                            isValid: true
                        },
                        description: {
                            value: responseData.post.description,
                            isValid: true
                        }
                    }, true)
                } catch(err) {
                }
            }
            fetchPost();
            
            if(isLoading) {
                return (
                    <div className="center">
                        <LoadingSpinner asOverlay />
                    </div>
                    );
            }
        
            if(!loadedPost && !error) {
                return (
                <div className="center">
                    <Card>
                       <h2>Could not find place!</h2>
                    </Card>
                </div>
                );
            }
    }
    

    return (
        <React.Fragment>
            {/* Modal showing up when deleting a post */}
            <Modal
                show={showConfirmModal}
                onCancel={cancelDeleteHandler}
                header="Are you sure?"
                footerClass="place-item__modal-actions"
                footer={
                    <React.Fragment>
                    <Button inverse onClick={cancelDeleteHandler}>
                        CANCEL
                    </Button>
                    <Button danger onClick={confirmDeleteHandler}>
                        DELETE
                    </Button>
                    </React.Fragment>
                }
                >
                <p>Do you want to proceed and delete this item?</p>
            </Modal>

            {/* Show Modal when editing a post */}
            <Modal
                show={showEditModal}
                onCancel={canceEditPostHandler}
                header="Edit post below"
                footerClass="place-item__modal-actions"
                footer={
                    <React.Fragment>
                    <Button inverse onClick={canceEditPostHandler}>
                        CANCEL
                    </Button>
                    <Button green onClick={postUpdateSubmitHandler}>
                        EDIT
                    </Button>
                    </React.Fragment>
                }
                >
                    <Input
                    id="title"
                    element="input"
                    type="text"
                    label="Title"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid title."
                    onInput={inputHandler}
                    //initialValue={loadedPost.title}
                    initialValid={true}
                    />
                    <Input
                    id="description"
                    element="textarea"
                    label="Description"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Please enter a valid description (min 5 characters)."
                    onInput={inputHandler}
                    // initialValue={loadedPost.description}
                    initialValid={true}
                    />
            </Modal>

            {/* Actual post methods */}
            <ErrorModal error={error} onClear={clearError} />
            <li className='user-item'>
                {/* <Card className='user-item__content'> */}
                <Card post>
                    {isLoading && <LoadingSpinner asOverlay />}
                    <div className="position-right">
                    {auth.userId === props.creatorId && 
                        <Button danger onClick={showDeleteWarningHandler}>x</Button>
                    }
                    </div>
                    <div className="post-content">
                        <h1 className="post-title">T: {props.title}</h1>
                        <h2>D: {props.description}</h2>
                    </div>
                    <div className="post-bottom">
                        {auth.userId === props.creatorId && 
                        //  <Button inverse onClick={showEditPostHandler}>Edit</Button>
                            <Button inverse onClick={() => {
                                showEditPostHandler();
                                editPostHandler();
                            }}>Edit</Button>
                        }
                        <Button green onClick={increaseCounter}>Like</Button>
                        <span className="counter__output">{counter}</span>
                    </div>  
                </Card>
            </li>
        </React.Fragment>
    );
};

export default PostItem;