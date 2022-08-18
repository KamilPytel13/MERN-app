import React, {useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Input from "../../shared/components/FormElements/Input";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import { AuthContext } from "../../shared/context/authContext";
import { useHttp } from "../../shared/hooks/http-hook";
import { useForm } from "../../shared/hooks/form-hook";
import './UserItem.css';


const EventItem = props => {
    const {isLoading, error, sendRequest, clearError} = useHttp();
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [loadedEvent, setLoadedEvent] = useState();
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [formState, inputHandler, setFormData] = useForm({
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
    }, false);

    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true);
      };

      const cancelDeleteHandler = () => {
        setShowConfirmModal(false);
      };

      const showEditEventHandler = () => {
        setShowEditModal(true);
    }

      const canceEditEventHandler = () => {
        setShowEditModal(false);
    }

    const postUpdateSubmitHandler = async event => {
        event.preventDefault();
        try {
            await sendRequest(
                `http://localhost:5002/api/events/${props.id}`,
                "PATCH",
                JSON.stringify({
                  title: formState.inputs.title.value,
                  eventTime: formState.inputs.eventTime.value,
                  eventDate: formState.inputs.eventDate.value,
                  place: formState.inputs.place.value,
                  description: formState.inputs.description.value,
                }),
                {
                  "Content-Type": "application/json",
                  "Authorization": "Bearer " + auth.token
                }
              );
              navigate('/')
        } catch(err) {}
    }

    const editEventHandler = () => {
        const fetchEvent = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5002/api/events/${props.id}`);
                setLoadedEvent(responseData.event);
                setFormData({
                    title: {
                        value: responseData.event.title,
                        isValid: true
                    },
                    description: {
                        value: responseData.event.description,
                        isValid: true
                    },
                    eventTime: {
                        value: responseData.event.eventTime,
                        isValid: true
                    },
                    eventDate: {
                        value: responseData.event.eventDate,
                        isValid: true
                    },
                    place: {
                        value: responseData.event.place,
                        isValid: true
                    }
                }, true)
            } catch(err) {
            }
        }
        fetchEvent();
        
        if(isLoading) {
            return (
                <div className="center">
                    <LoadingSpinner asOverlay />
                </div>
                );
        }
    
        if(!loadedEvent && !error) {
            return (
            <div className="center">
                <Card>
                   <h2>Could not find event!</h2>
                </Card>
            </div>
            );
        }
}

      const confirmDeleteHandler = async () => {
        setShowConfirmModal(false);
        try {
            await sendRequest(
              `http://localhost:5002/api/events/${props.id}`,
              "DELETE",
              null,
              {
                "Authorization": "Bearer " + auth.token
              }
            );
            props.onDelete(props.id);
            navigate('/')
        } catch(err) {
        }
    };

    return (
        <React.Fragment>
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
        
        {/* edit event modal */}
        <Modal
                show={showEditModal}
                onCancel={canceEditEventHandler}
                header="Edit event"
                footerClass="place-item__modal-actions"
                footer={
                    <React.Fragment>
                    <Button inverse onClick={canceEditEventHandler}>
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
            </Modal>
        
        <li className='user-item'>
            <Card className='user-item__content'>
            {isLoading && <LoadingSpinner asOverlay />}
                {auth.userId === props.creator && 
                            <Button inverse onClick={() => {
                                showEditEventHandler();
                                editEventHandler();
                            }}>Edit</Button>
                        }
                {auth.userId === props.creator && 
                    <Button danger onClick={showDeleteWarningHandler}>x</Button>
                }
                <div className='user-item__info'>
                    <h1 id="title">Title: {props.title}</h1>
                    <h2>Description: {props.description}</h2>
                    <h2 className="grey">Place: {props.place}</h2>
                    <h2>Date: {props.date}</h2>
                    <h2 className="grey">Time: {props.time}</h2>
                    <h2>Created by: {props.creator}</h2>
                </div>
            </Card>
        </li>

        </React.Fragment>
    );
};

export default EventItem;