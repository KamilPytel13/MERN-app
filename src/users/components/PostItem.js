import React, {useState} from "react";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import { useHttp } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
//import './UserItem.css';
import './PostItem.css';

const PostItem = props => {
    const {isLoading, error, sendRequest, clearError} = useHttp();
    const [showConfirmModal, setShowConfirmModal] = useState(false);

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

            {/* Actual post methods */}
            <ErrorModal error={error} onClear={clearError} />
            <li className='user-item'>
                {/* <Card className='user-item__content'> */}
                <Card post>
                    {isLoading && <LoadingSpinner asOverlay />}
                    <div className="position-right">
                    <Button danger onClick={showDeleteWarningHandler}>x</Button>
                    </div>
                    <div className="post-content">
                        <h1 className="post-title">T: {props.title}</h1>
                        <h2>D: {props.description}</h2>
                    </div>
                    <div className="position-right">
                    <Button green>Like</Button>
                    </div>  
                </Card>
            </li>
        </React.Fragment>
    );
};

export default PostItem;