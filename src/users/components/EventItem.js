import React, {useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/authContext";
import { useHttp } from "../../shared/hooks/http-hook";
import './UserItem.css';


const EventItem = props => {
    const {isLoading, error, sendRequest, clearError} = useHttp();
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [loadedPost, setLoadedPost] = useState();
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true);
      };

      const cancelDeleteHandler = () => {
        setShowConfirmModal(false);
      };

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
        
        <li className='user-item'>
            <Card className='user-item__content'>
            {isLoading && <LoadingSpinner asOverlay />}
                <Button inverse>Edit</Button>
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