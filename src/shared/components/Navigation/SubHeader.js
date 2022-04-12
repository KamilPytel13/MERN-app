import './SubHeader.css'

const SubHeader = props => {
    return (
        <header className='sub-header'>
            {props.children}
        </header>
    );
}

export default SubHeader;