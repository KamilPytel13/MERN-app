import FeatureItem from "./FeatureItem";

const List = props => {
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