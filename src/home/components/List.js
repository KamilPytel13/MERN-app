import FeatureItem from "./FeatureItem";

const List = props => {
    if(props.items.length === 0) {
        return <h2>No features to display</h2>
    }

    return (
        <ul className="boxes">
            {props.items.map(item => {
                return (
                    <FeatureItem 
                    key={item.id} 
                    id={item.id} 
                    title={item.title}
                    description= {item.description} />
                )
            })}
        </ul>
    );
}

export default List;