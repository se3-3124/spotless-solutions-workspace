import './AnotherWorld.css';
import {useParams} from 'react-router-dom';

export default function AnotherWorld() {
    const {id} = useParams();

    return (
        <h1 className="text-3xl font-bold underline hello-world-route">
            ANOTHER WORLD! {id}
        </h1>
    )
}
