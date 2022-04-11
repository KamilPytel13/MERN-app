import './FeatureItem.css';

const FeatureItem = props => {
    return (
        <div className="box">
            <h2>{props.title}</h2>
            <p>{props.description}</p>
        </div>
    );
}

export default FeatureItem;